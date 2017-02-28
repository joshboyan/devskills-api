var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var jsdom = require("jsdom");

var START_URL = "https://www.indeed.com/q-Front-End-Developer-l-Portland,-OR-jobs.html";
var MAX_PAGES_TO_VISIT = 1000;
var TERMS = [ 'accessibility', 'agile', 'ajax', 'apache', 'api', 'angular', 'aws', 'backbone', 'bem', 'bootstrap', 'browserify', 'cassandra', 'chai', 'codeignitor', 'command line', 'css', 'django', 'docker', 'ember', 'foundation', 'git', 'github', 'grunt', 'gulp', 'hbase', 'html', 'jasmine', 'javascript', 'jenkins', 'jekyll', 'jest', 'jira', 'jquery', 'json', 'karma', 'kohona', 'less', 'linux', 'marionette', 'mobile', 'mocha', 'mongo', 'nginx', 'mvc', 'node', 'npm', 'nosql', 'open source', 'oocss', 'perl', 'photoshop', 'php', 'postcss', 'protractor', 'puppet', 'python', 'rails', 'react', 'redux', 'restful', 'ruby','sass', 'sinon', 'sql', 'symfony', 'tomcat', 'ui', 'vagrant', 'vue', 'webpack', 'wireframes', 'wordpress', 'zend'];
var counter = {
    'front-end': {
      'accessibility': 0,
      'agile': 0,
      'ajax': 0,
      'apache': 0,
      'api': 0,
      'angular': 0,
      'aws': 0,
      'backbone': 0,
      'bem': 0,
      'bootstrap': 0,
      'browserify': 0,
      'cassandra': 0,
      'chai': 0,
      'codeignitor': 0,
      'command line': 0,
      'css': 0,
      'django': 0,
      'docker': 0,
      'ember': 0,
      'foundation': 0,
      'git': 0,
      'github': 0,
      'grunt': 0,
      'gulp': 0,
      'hbase': 0,
      'html': 0,
      'jasmine': 0,
      'javascript': 0,
      'jekyll': 0,
      'jenkins': 0,
      'jest': 0,
      'jira': 0,
      'jquery': 0,
      'json': 0,
      'karma': 0,
      'kohana': 0,
      'less': 0,
      'linux': 0,
      'marionette': 0,
      'mobile': 0,
      'mocha': 0,
      'mongo': 0,
      'mvc': 0,
      'nginx': 0,
      'node': 0,
      'nosql': 0,
      'npm': 0,
      'oocss': 0,
      'open source': 0,
      'photoshop': 0,
      'php': 0,
      'perl': 0,
      'postcss': 0,
      'protractor': 0,
      'puppet': 0,
      'python': 0,
      'rails':0,
      'react': 0,
      'redux': 0,
      'restful': 0,
      'ruby': 0,
      'sass': 0,
      'saas': 0,
      'sinon': 0,
      'symfony': 0,
      'sql': 0,
      'tomcat': 0,
      'ui': 0,
      'vagrant': 0,
      'vue': 0,
      'webpack': 0,
      'wireframes': 0,
      'wordpress': 0,
      'zend': 0  
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
        if (error) {
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
