const request = require('request');
const token = process.env.API_KEY;
const rootURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + token + '&query=';

module.exports = {
    movieSearch
};

function movieSearch(req, res) {
    const search = req.query.search;
    const baseURL = rootURL + search + '&page=';

    let allResults = [];
    let resultIds = [];
    let page = 1;

    gatherMovies();

    function gatherMovies() {
        request(baseURL + page, function (err, response, body) {
            const testing = JSON.parse(body);
            testing.results.forEach(function (r) {
                if (r.genre_ids.includes(878) && !resultIds.includes(r.id)) {
                    allResults.push(r);
                    resultIds.push(r.id);
                }
                else return;
            })
            if (testing.page <= testing.total_pages) {
                gatherMovies();
            } else {
                res.render('movies', { allResults: allResults, user: req.user })
            }
            page++;
        })
    }
}