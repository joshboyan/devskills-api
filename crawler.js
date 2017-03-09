"use strict";
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsdom = require("jsdom");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var START_URL = "https://www.indeed.com/q-Front-End-Developer-l-Portland,-OR-jobs.html";
var MAX_PAGES_TO_VISIT = 10;
var TERMS = ['accessibility', 'agile', 'ajax', 'apache', 'api', 'angular', 'aws', 'backbone', 'bem', 'bootstrap', 'browserify', 'cassandra', 'chai', 'codeignitor', 'command line', 'css', 'django', 'docker', 'ember', 'foundation', 'git', 'github', 'grunt', 'gulp', 'hbase', 'html', 'jasmine', 'javascript', 'jenkins', 'jekyll', 'jest', 'jira', 'jquery', 'json', 'karma', 'kohona', 'less', 'linux', 'marionette', 'mobile', 'mocha', 'mongo', 'nginx', 'mvc', 'node', 'npm', 'nosql', 'open source', 'oocss', 'perl', 'photoshop', 'php', 'postcss', 'protractor', 'puppet', 'python', 'rails', 'react', 'redux', 'restful', 'ruby', 'sass', 'sinon', 'sql', 'symfony', 'tomcat', 'ui', 'vagrant', 'vue', 'webpack', 'wireframes', 'wordpress', 'zend'];
var counter = {
    'front-end': [
        {'skill': 'rails', 'times' : 0},
        {'skill': 'react', 'times': 0},
        {'skill': 'redux', 'times': 0},
        {'skill': 'restful', 'times': 0},
        {'skill': 'ruby', 'times': 0},
        {'skill': 'sass', 'times': 0},
        {'skill': 'saas', 'times': 0},
        {'skill': 'sinon', 'times': 0},
        {'skill': 'symfony', 'times': 0},
        {'skill': 'sql', 'times': 0},
        {'skill': 'tomcat', 'times': 0},
        {'skill': 'ux', 'times': 0},
        {'skill': 'vagrant', 'times': 0},
        {'skill': 'vue', 'times': 0},
        {'skill': 'webpack', 'times': 0},
        {'skill': 'wireframes', 'times': 0},
        {'skill': 'wordpress', 'times': 0},
        {'skill': 'zend', 'times': 0}
    ]
}

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
var day = 86400000; // Milliseconds in a day

//Run the script once every 24 hours
setInterval(function() {
    pagesToVisit.push(START_URL);
    crawl();

    function crawl() {
        // Something has gone wirng if we are crawling this many pages so stop
        if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
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
            if (response.statusCode !== 200) {
                console.log('Bad response. Status Code:', response.statusCode)
                callback();
                return;
            }
            if (error) {
                console.log(error);
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
                    var divs = window.$('div').toArray();
                    var paragraphs = window.$('p').toArray();
                    var lists = window.$('li').toArray();
                    var elements = paragraphs.concat(divs, lists);
                    //console.log(elements);
                    TERMS.forEach(function(term) {
                        for (elem of elements) {
                            if (elem.innerHTML.toLowerCase().includes(term)) {
                                counter['front-end'][term] += 1;
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
}, day);

function dataPush() {
    var dburl = 'mongodb://localhost:27017/crawlerTest';

    // Use connect method to connect to the server
    MongoClient.connect(dburl, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertCounter(db, function() {
            findDbCounter(db, function() {
                db.close();
            });
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

    var findDbCounter = function(db, callback) {
        //Get collection
        var collection = db.collection('crawlerTest');
        // Find some documents
        collection.find().toArray(function(err, dbCounter) {
            assert.equal(err, null);
            console.log(dbCounter);
            callback(dbCounter);
        });
    }
}
