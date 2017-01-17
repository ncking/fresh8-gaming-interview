// Client HTTP request library https://github.com/visionmedia/superagent/tree/master/lib
var request = require('superagent');
// Lightweight ES6 Promise polyfill for the browser and node https://github.com/taylorhakes/promise-polyfill
var Promise = require('promise-polyfill');
// basic model just a JavaScript POJO 
var model = require('./model');

var hydrate = function (results) {
    var models = [];
    results.forEach(function (result) {
        models.push(model(result));
    });
    return models;
}


module.exports = {
    /*
     * Fixtures method
     * Only used in development, as repeated requests
     * a) slow development
     * b) risk being banned by the API, by exceeding the request limit
     * 
     * returns
     * 
     query: function () {
     var fixtures = require('./fixture/github.json');
     return (Promise.resolve(fixtures.items));
     },
     */

    /*
     * @returns {Promise} result
     */
    query: function (queryParams) {
        return new Promise(function (resolve, reject) {
            request.get('https://api.github.com/search/repositories')
                    .query(queryParams)
                    .end(function (err, result) {
                        if (!err && result && result.body) {
                            var results = result.body.items;
                            if (queryParams.limit) {
                                results = results.slice(0, queryParams.limit);
                            }
                            resolve(hydrate(results));
                        } else {
                            reject(new Error("XHR error"));
                        }
                    });
        });
    }
}

