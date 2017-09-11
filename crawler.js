"use strict";
const counter = require('./counter');
const dataPush = require('./database');
const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');
const jsdom = require("jsdom");

const START_URL = "https://www.indeed.com/q-developer-l-remote-jobs.html";
const MAX_PAGES_TO_VISIT = 10;

const pagesVisited = {};
let numPagesVisited = 0;
const pagesToVisit = [];
const url = new URL(START_URL);
const baseUrl = url.protocol + "//" + url.hostname;
const day = 86400000; // Milliseconds in a day

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
        const nextPage = pagesToVisit.pop();
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
        // Parse the document body to pass to collectInternalLinks()
        const $ = cheerio.load(body);
        // Move to next page if the current page body is undefined.
        if (typeof $ === 'undefined') {
            console.log('Page body is undefined');
            // Callback is calling crawl()
            callback();
            return;
        }
        console.log('DOM loaded to cheerio');
        jsdom.env(
            url, ["http://code.jquery.com/jquery.js"],
            function(err, window) {
                // All of the nodes that contain text we would like to scrape
                //const divs = window.$('div').toArray();
                const paragraphs = window.$('p').toArray();
                const lists = window.$('li').toArray();
                const elements = paragraphs.concat(paragraphs, lists);
                console.log('Elements have been collected');
                counter['front-end'].forEach(skill => {
                    for (const elem of elements) {
                        if (elem.innerHTML.toLowerCase().includes(skill.name)) {
                            skill.value += 1;
                            //console.log(term, ':', counter['front-end'][term]);
                        }
                    }
                });
                console.log('Skills have been counted');
            }
        );
        // Collect all the links to job postings
        if ($(".result h2 a")) {
            console.log('Calling collectInternalLinks')
            collectInternalLinks($);
        }
        // Callback is calling crawl()
        callback();
    });
}

function collectInternalLinks($) {
    const relativeLinks = $(".result h2 a");
    const nextListings = $('.pagination a').last();
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
