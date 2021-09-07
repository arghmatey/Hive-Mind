const request = require('request');
const token = process.env.API_KEY;

module.exports = {
    allPopular,
    movieSearch,
    show
};

// i loathe this function and am looking for the right solution
function allPopular(req, res) {
    request('https://api.themoviedb.org/3/discover/movie?api_key=' + token + '&with_genres=878', function (err, response, body) {
        const movies = JSON.parse(body);
        request('https://api.themoviedb.org/3/discover/tv?api_key=' + token + '&with_genres=10765', function (err, response, body) {
            const tvShows = JSON.parse(body);
            console.log(tvShows);
            res.render('index', {user: req.user, popularMovies: movies.results, popularTV: tvShows.results})
        });
        
    });
}

// api does not utilize more than 20 results per page, so manual pagination is needed
// i believe request may be depreciated, so i will need to find a different solution (probably one to use async)
function movieSearch(req, res) {
    const search = req.query.search;
    const baseURL = 'https://api.tmdb.org/3/search/movie?api_key=' + token + '&query=' + search + '&page=';

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
                res.render('movies/browse', { search: search, allResults: allResults, user: req.user })
            }
            page++;
        })
    }
}

function show(req, res) {
    const movieURL = 'https://api.themoviedb.org/3/movie/' + req.params.id + '?api_key=' + token + '&language=en-US';
    request(movieURL, function (err, response, body) {
        const movieData = JSON.parse(body);
        res.render('movies/details', { movie: movieData, user: req.user });
    });
}