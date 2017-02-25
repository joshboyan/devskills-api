var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsdom = require("jsdom");

var START_URL = "https://www.indeed.com/q-Front-End-Developer-l-Portland,-OR-jobs.html";
var SEARCH_WORD = "bobaloo";
var MAX_PAGES_TO_VISIT = 10;
var TERMS = ['javascript', 'css', 'html', 'angular'];
var counter = {
  'front-end': {
    'javascript': 0,
    'css': 0,
    'html': 0,
    'angular': 0
  }
}

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;
var wordCount = 0;

pagesToVisit.push(START_URL);
crawl();

function crawl() {
    if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
        console.log("Reached max limit of number of pages to visit.");
        return;
    }
    var nextPage = pagesToVisit.pop();
    if (nextPage in pagesVisited) {
        // We've already visited this page, so repeat the crawl
        crawl();
    } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
    }
}

function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;

    // Make the request
    console.log("Visiting page " + url);
    request(url, function(error, response, body) {
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if (response.statusCode !== 200) {
            callback();
            return;
        }
        // Parse the document body
        /*var $ = cheerio.load('body h2');
        var isWordFound = searchForWord($, SEARCH_WORD);
        console.log($.parseHTML());
        if(isWordFound) {
          console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
        } else {
          collectInternalLinks($);
          // In this short program, our callback is just calling crawl()
          callback();
        }*/
        
        jsdom.env(
            url, ["http://code.jquery.com/jquery.js"],
            function(err, window) {
                var elements = window.$(".summary").toArray();
                console.log(elements);
                TERMS.forEach(function(term) {
                for(elem of elements) {
                  if (elem.innerHTML.toLowerCase().includes(term)) {
                    counter['front-end'][term]+= 1;
                    console.log(term, ':', counter['front-end'][term]);
                  }
                }
              });
            }
        );

    });
}

function searchForWord($, word) {
    var bodyText = $('html > body').text().toLowerCase();
    return (bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $(".result h2 a");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
}
