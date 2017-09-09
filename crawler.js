"use strict";
var counter = require('./counter');
var dataPush = require('./database');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsdom = require("jsdom");

var START_URL = "https://www.indeed.com/q-Front-End-Developer-l-Portland,-OR-jobs.html";
var MAX_PAGES_TO_VISIT = 5;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
var day = 86400000; // Milliseconds in a day

//Run the script once every 24 hours
pagesToVisit.push(START_URL);
crawl();

function crawl() {
    // Something has gone wirng if we are crawling this many pages so stop
    if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
        dataPush();
        console.log("Reached max limit of number of pages to visit.");
        return;
    }
    // Keep crawling while we have pages in our queue
    if (pagesToVisit.length > 0) {
        var nextPage = pagesToVisit.pop();
        //Right here we need to ensure everything is removed from the array
        //console.log(pagesToVisit);
        if (nextPage in pagesVisited) {
            // We've already visited this page, so repeat the crawl
            crawl();
        } else {
            // New page we haven't visited
            visitPage(nextPage, crawl);
        }
    } else {
        // Push results to database when crawling is finished
        dataPush();
    }
}

function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;
    console.log(numPagesVisited);
    // Make the request
    console.log("Visiting page " + url);
    request(url, function(error, response, body) {
        // Check status code (200 is HTTP OK) 
        if (error) {
            console.log(error);
            callback();
            return;
        }
        if (response.statusCode !== 200) {
            console.log('Bad response. Status Code:', response.statusCode)
            callback();
            return;
        }
        // Parse the document body
        var $ = cheerio.load(body);
        // Move to next page if the current page body is undefined.
        if (typeof $ === 'undefined') {
            console.log('Page body is undefined');
            callback();
            return;
        }
        jsdom.env(
            url, ["http://code.jquery.com/jquery.js"],
            function(err, window) {
                // All of the nodes that contain text we would like to scrape
                //var divs = window.$('div').toArray();
                var paragraphs = window.$('p').toArray();
                var lists = window.$('li').toArray();
                var elements = paragraphs.concat(paragraphs, lists);
                //console.log(elements);
                counter['front-end'].forEach(skill => {
                    for (var elem of elements) {
                        if (elem.innerHTML.toLowerCase().includes(skill.name)) {
                            skill.value += 1;
                            //console.log(term, ':', counter['front-end'][term]);
                        }
                    }
                });
                //console.log('totals:', counter['front-end']);
            }
        );
        // Collect all the links to job postings
        if ($(".result h2 a")) {
            collectInternalLinks($);
        }
        // In this short program, our callback is just calling crawl()
        callback();
    });
}

function collectInternalLinks($) {
    var relativeLinks = $(".result h2 a");
    var nextListings = $('.pagination a').last();
    console.log("Found " + relativeLinks.length + " job entries on page");
    relativeLinks.each(function() {
        if (typeof $(this).attr('href') !== 'undefined') {
            pagesToVisit.push(baseUrl + $(this).attr('href'));
            //console.log($(this).attr('href'));
        }
    });
    if (typeof $(nextListings).attr('href') !== 'undefined') {
        pagesToVisit.unshift(baseUrl + $(nextListings).attr('href'));
    }
}
