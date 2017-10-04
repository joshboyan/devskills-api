# DevSkills microservice API

This Nodejs program provides a RESTful API for information about what skills are trending in the development field.

The API is built using expressjs with MVC architecture for the server and HTTP endpoints to access a Mongo NoSQL database hosted on Heroku. The docs and examples for the API are built using React.

The information in the database is gathered with a Node program. First, the program accesses the StackExchange API to get the top 100 tags used on StackOverflow and how many times each tag has been used. This information is used to dynamically generate a list of hastags to listen for over the Twitter streaming API. After 30 minutes of listening this data is added to the counter object created from Stack Overflow tags. Next, a script runs to scrape 300 pages of Indeed under the 'Remote Developer' to count any mention of the tags in the list and adds these to the counter object. The results are inserted into a MongoDB hosted on Heroku. Any errors trigger an email with the error message and a description of where in the program they happened.

User authentication for the API is accomplished using JSON Web Tokens and mongoose data modeling.

Unit tests for the node program and integration tests for the API are written using Mocha, Chai and Supertest. Unit test for the React interface are written using Jest.
