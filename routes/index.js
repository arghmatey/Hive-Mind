var router = require('express').Router();
var request = require('request');
const token = process.env.API_KEY;

router.get('/', function (req, res) {
    request('https://api.themoviedb.org/3/discover/movie?api_key=' + token + '&with_genres=878', function (err, response, body) {
        const movies = JSON.parse(body);
        request('https://api.themoviedb.org/3/discover/tv?api_key=' + token + '&with_genres=10765', function (err, response, body) {
            const tvShows = JSON.parse(body);
            request('https://api.themoviedb.org/3/trending/all/week?api_key=' + token, function (err, response, body) {
              const trending = JSON.parse(body);
              res.render('index', {user: req.user, popularMovies: movies.results, popularTV: tvShows.results, trending: trending.results})
            })
        });
    });
})

// api does not utilize more than 20 results per page, so manual pagination is needed
router.get('/search', function (req, res) {
  const search = req.query.search;

  let allResults = [];
  let resultIds = [];
  let page = 1;

  gatherSearch();

  function gatherSearch() {
    request('https://api.themoviedb.org/3/search/multi?api_key=' + token + '&query=' + search + '&page=' + page, function (err, response, body) {
      const results = JSON.parse(body);
      results.results.forEach(function (result) {
          if (result.genre_ids && result.genre_ids.includes(878) && !resultIds.includes(result.id)) {
              allResults.push(result);
              resultIds.push(result.id);
          }
          else return;
      })
      if (results.page <= results.total_pages) {
          gatherSearch();
      } else {
          res.render('search', { search: search, allResults: allResults, user: req.user })
      }
      page++;
    })
  }
})

module.exports = router;