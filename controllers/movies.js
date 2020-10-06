const request = require('request');
const token = process.env.API_KEY;
const rootURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + token + '&query=';

module.exports = {
    movieSearch,
    show
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
            const movies = JSON.parse(body);
            movies.results.forEach(function (r) {
                if (r.genre_ids.includes(878) && !resultIds.includes(r.id)) {
                    allResults.push(r);
                    resultIds.push(r.id);
                }
                else return;
            })
            if (movies.page <= movies.total_pages) {
                gatherMovies();
            } else {
                res.render('movies/index', { allResults: allResults, user: req.user })
            }
            page++;
        })
    }
}

function show(req, res) {
    const movieURL = 'https://api.themoviedb.org/3/movie/' + req.params.id + '?api_key=' + token + '&language=en-US';
    request(movieURL, function (err, response, body) {
        const movieData = JSON.parse(body);
        console.log(movieData);
        res.render('movies/show', { movie: movieData, user: req.user });
    });
}