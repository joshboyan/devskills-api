"use strict";
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsdom = require("jsdom");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var START_URL = "https://www.indeed.com/q-Front-End-Developer-l-Portland,-OR-jobs.html";
var MAX_PAGES_TO_VISIT = 500;
//var TERMS = ['accessibility', 'agile', 'ajax', 'apache', 'api', 'angular', 'aws', 'backbone', 'bem', 'bootstrap', 'browserify', 'cassandra', 'chai', 'codeignitor', 'command line', 'css', 'django', 'docker', 'ember', 'foundation', 'git', 'github', 'grunt', 'gulp', 'hbase', 'html', 'jasmine', 'javascript', 'jenkins', 'jekyll', 'jest', 'jira', 'jquery', 'json', 'karma', 'kohona', 'less', 'linux', 'marionette', 'mobile', 'mocha', 'mongo', 'nginx', 'mvc', 'node', 'npm', 'nosql', 'open source', 'oocss', 'perl', 'photoshop', 'php', 'postcss', 'protractor', 'puppet', 'python', 'rails', 'react', 'redux', 'restful', 'ruby', 'sass', 'sinon', 'sql', 'symfony', 'tomcat', 'ui', 'vagrant', 'vue', 'webpack', 'wireframes', 'wordpress', 'zend'];
var counter = {
    'date' : new Date(),
    'front-end': [
        { 'name': 'accessibility', 'value': 0 },
        { 'name': 'agile', 'value': 0 },
        { 'name': 'ajax', 'value': 0 },
        { 'name': 'apache', 'value': 0 },
        { 'name': 'api', 'value': 0 },
        { 'name': 'angular', 'value': 0 },
        { 'name': 'asp', 'value': 0 },
        { 'name': 'aws', 'value': 0 },
        { 'name': 'backbone', 'value': 0 },
        { 'name': 'bem', 'value': 0 },
        { 'name': 'bootstrap', 'value': 0 },
        { 'name': 'browserify', 'value': 0 },
        { 'name': 'c#', 'value': 0 },
        { 'name': 'c++', 'value': 0 },
        { 'name': 'cassandra', 'value': 0 },
        { 'name': 'chai', 'value': 0 },
        { 'name': 'codeignitor', 'value': 0 },
        { 'name': 'command line', 'value': 0 },
        { 'name': 'd3', 'value': 0 },
        { 'name': 'django', 'value': 0 },
        { 'name': 'docker', 'value': 0 },
        { 'name': 'ecma', 'value': 0 },
        { 'name': 'ember', 'value': 0 },
        { 'name': 'express', 'value': 0 },
        { 'name': 'foundation', 'value': 0 },
        { 'name': 'git', 'value': 0 },
        { 'name': 'github', 'value': 0 },
        { 'name': 'grunt', 'value': 0 },
        { 'name': 'gulp', 'value': 0 },
        { 'name': 'hbase', 'value': 0 },
        { 'name': 'jasmine', 'value': 0 },
        { 'name': 'jekyll', 'value': 0 },
        { 'name': 'jenkins', 'value': 0 },
        { 'name': 'jest', 'value': 0 },
        { 'name': 'jira', 'value': 0 },
        { 'name': 'jquery', 'value': 0 },
        { 'name': 'json', 'value': 0 },
        { 'name': 'karma', 'value': 0 },
        { 'name': 'kohana', 'value': 0 },
        { 'name': 'less', 'value': 0 },
        { 'name': 'linux', 'value': 0 },
        { 'name': 'marionette', 'value': 0 },
        { 'name': 'mobile', 'value': 0 },
        { 'name': 'mocha', 'value': 0 },
        { 'name': 'mongo', 'value': 0 },
        { 'name': 'mvc', 'value': 0 },
        { 'name': '.net', 'value': 0 },
        { 'name': 'nginx', 'value': 0 },
        { 'name': 'node', 'value': 0 },
        { 'name': 'nosql', 'value': 0 },
        { 'name': 'npm', 'value': 0 },
        { 'name': 'oocss', 'value': 0 },
        { 'name': 'open source', 'value': 0 },
        { 'name': 'photoshop', 'value': 0 },
        { 'name': 'php', 'value': 0 },
        { 'name': 'perl', 'value': 0 },
        { 'name': 'polymer', 'value': 0 },
        { 'name': 'postcss', 'value': 0 },
        { 'name': 'protractor', 'value': 0 },
        { 'name': 'puppet', 'value': 0 },
        { 'name': 'python', 'value': 0 },
        { 'name': 'rails', 'value': 0 },
        { 'name': 'react', 'value': 0 },
        { 'name': 'redux', 'value': 0 },
        { 'name': 'restful', 'value': 0 },
        { 'name': 'ruby', 'value': 0 },
        { 'name': 'sass', 'value': 0 },
        { 'name': 'saas', 'value': 0 },
        { 'name': 'sinon', 'value': 0 },
        { 'name': 'symfony', 'value': 0 },
        { 'name': 'sql', 'value': 0 },
        { 'name': 'tomcat', 'value': 0 },
        { 'name': 'ux', 'value': 0 },
        { 'name': 'vagrant', 'value': 0 },
        { 'name': 'vue', 'value': 0 },
        { 'name': 'webpack', 'value': 0 },
        { 'name': 'wireframes', 'value': 0 },
        { 'name': 'wordpress', 'value': 0 },
        { 'name': 'zend', 'value': 0 }
    ]
}

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


function dataPush() {
    var dburl = 'mongodb://localhost:27017/crawlerTest';

    // Use connect method to connect to the server
    MongoClient.connect(dburl, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertCounter(db, function() {

            db.close();
        });

    });
    var insertCounter = function(db, callback) {

        var collection = db.collection('crawlerTest');

        collection.insert(
            counter,
            function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert(1, result.ops.length);
                callback(result);
            });
    }
}
