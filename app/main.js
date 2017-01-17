"use strict";
var githubRepository = require('./github/repository');
var template = require('./github/view/summary');
/*
 * 
 */
document.addEventListener("DOMContentLoaded", function (e) {
    var
            resultsDiv = document.getElementById('results-list'),
            html = '',
            params = {
                limit: 10, // Github results are paginated in pages of 30 results. We only need the first 10
                sort: 'stars',
                order: 'desc',
                q: 'angular.js+language:javascript'
            }
    /*
     * Query the Github model, to get data
     */
    githubRepository.query(params).then(function (models) {
        models.forEach(function (model) {
            html += template({model: model});
        });
        resultsDiv.innerHTML = html;
    }).catch(function (error) {
        alert(error);
    });
});

