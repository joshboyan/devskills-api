/**
 * This file scrapes Indeed and adss how many mentions of each tag
 * it comes across to the twitterSkills counter object. Some tags
 * like 'c' or 'r' yield false positives and need handling.
 */
const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');
const jsdom = require('jsdom');
const email = require('./email');

const crawler = twitterSkills => {
    'use strict';

    return new Promise(resolve => {

        const startURL = 'https://www.indeed.com/q-developer-l-remote-jobs.html';
        const maxPagesToVisit = 300;
        const pagesVisited = {};
        let numPagesVisited = 0;
        const pagesToVisit = [];
        const url = new URL(startURL);
        const baseUrl = url.protocol + '//' + url.hostname;

        pagesToVisit.push(startURL);
        crawl();

        function crawl() {
            // Something has gone wirng if we are crawling this many pages so stop
            if(numPagesVisited >= maxPagesToVisit) {
                resolve(twitterSkills);
                console.log('Reached max limit of number of pages to visit.');
                return;
            }
            // Keep crawling while we have pages in our queue
            if(pagesToVisit.length > 0) {
                const nextPage = pagesToVisit.pop();
                //Right here we need to ensure everything is removed from the array
                //console.log(pagesToVisit);
                if(nextPage in pagesVisited) {
                    // We've already visited this page, so repeat the crawl
                    crawl();
                } else {
                    // New page we haven't visited
                    visitPage(nextPage, crawl);
                }
            } else {
                // Push results to database when crawling is finished
                resolve(twitterSkills);
            }
        }

        function visitPage(url, callback) {
            // Add page to our set
            pagesVisited[url] = true;
            numPagesVisited++;
            console.log(numPagesVisited);
            // Make the request
            console.log('Visiting page ' + url);
            request(url, function(err, res, body) {
                // Check status code (200 is HTTP OK)
                if(err) {
                    email('There was a request error crawling indeed', err);
                    console.log(err);
                    callback();
                    return;
                }
                if(res.statusCode !== 200) {
                    email('One of the response codes was bad crawling indeed', err);
                    console.log('Bad response. Status Code:', res.statusCode)
                    callback();
                    return;
                }
                // Parse the document body to pass to collectInternalLinks()
                const $ = cheerio.load(body);
                // Move to next page if the current page body is undefined.
                if(typeof $ === 'undefined') {
                    console.log('Page body is undefined');
                    // Callback is calling crawl()
                    callback();
                    return;
                }
                console.log('DOM loaded to cheerio');
                try {
                    jsdom.env(
                        url, ['http://code.jquery.com/jquery.js'],

                        function(err, window) {
                            if(window && window.$ !== 'undefined') {
                            // All of the nodes that contain text we would like to scrape
                            //const divs = window.$('div').toArray();
                            const paragraphs = window.$('p').toArray();
                            const lists = window.$('li').toArray();
                            const elements = paragraphs.concat(paragraphs, lists);
                            console.log('Elements have been collected');

                            twitterSkills.forEach(skill => {
                                for(const elem of elements) {
                                    if(elem.innerHTML.toLowerCase().includes(skill.name)) {
                                        skill.indeed += 1;
                                    }
                                }
                            });
                            console.log('Skills have been counted');
                            }
                        }
                    );
                } catch (err) {
                    email('There was a problem parsing one of the DOM bodies crawling indeed', err);
                    console.error('There was a problem parsing the DOM body', err)
                } finally {
                    // Collect all the links to job postings
                    if($('.result h2 a')) {
                        console.log('Calling collectInternalLinks')
                        collectInternalLinks($);
                    }
                    // Callback is calling crawl()
                    callback();
                }
            });
        }

        function collectInternalLinks($) {
						// This is how job listings are organized on linked in
            const relativeLinks = $('.result h2 a');
            const nextListings = $('.pagination a').last();
            console.log('Found ' + relativeLinks.length + ' job entries on page');

            relativeLinks.each(function() {
                if(typeof $(this).attr('href') !== 'undefined') {
                    pagesToVisit.push(baseUrl + $(this).attr('href'));
                    //console.log($(this).attr('href'));
                }
            });

            if(typeof $(nextListings).attr('href') !== 'undefined') {
                pagesToVisit.unshift(baseUrl + $(nextListings).attr('href'));
            }
        }
    });
}

module.exports = crawler;
