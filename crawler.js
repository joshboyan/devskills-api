var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsdom = require("jsdom");

var START_URL = "https://www.indeed.com/q-Front-End-Developer-l-Portland,-OR-jobs.html";
var MAX_PAGES_TO_VISIT = 10000;
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

pagesToVisit.push(START_URL);
crawl();

function crawl() {
    if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
        console.log("Reached max limit of number of pages to visit.");
        return;
    }
    if (pagesToVisit.length > 0) {
    var nextPage = pagesToVisit.pop();
    //Right here we need to ensure everything is removed from the array
    console.log(pagesToVisit);
    if (nextPage in pagesVisited) {
        // We've already visited this page, so repeat the crawl
        crawl();
    } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
    }
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
        if(error) {
          console.log(error);
          callback();
          return;
        }
        console.log("Status code: " + response.statusCode);
        if (response.statusCode !== 200) {
            callback();
            return;
        }
        // Parse the document body
        var $ = cheerio.load(body);
        jsdom.env(
            url, ["http://code.jquery.com/jquery.js"],
            function(err, window) {
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
                console.log('totals:', counter['front-end']);
            }
        );
        if($(".result h2 a")) {
        collectInternalLinks($);
      }
        // In this short program, our callback is just calling crawl()
        callback();
    });
}

function searchForWord($, word) {
    var bodyText = $('html > body').text().toLowerCase();
    return (bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $(".result h2 a"); 
    var nextListings = $('#resultsCol .pn').parent();
    console.log("Found " + relativeLinks.length + " job entries on page");
    relativeLinks.each(function() {
      if(typeof $(this).attr('href') !== 'undefined') {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
        console.log($(this).attr('href'));
      }
    });
    if(typeof $(nextListings).attr('href') !== 'undefined') {
    pagesToVisit.unshift(baseUrl + $(nextListings).attr('href'));
  }
}
