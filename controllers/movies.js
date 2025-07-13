const request = require("request");
const Review = require("../models/review");
const token = process.env.API_KEY;

module.exports = {
  movieSearch,
  show,
  moviePopular,
};

// api does not utilize more than 20 results per page, so manual pagination is needed
function movieSearch(req, res) {
  const search = req.query.search;
  const baseURL =
    "https://api.tmdb.org/3/search/movie?api_key=" +
    token +
    "&query=" +
    search +
    "&page=";

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
        } else return;
      });
      if (movies.page <= movies.total_pages) {
        gatherMovies();
      } else {
        res.render("movies/browse", {
          search: search,
          allResults: allResults,
          user: req.user,
        });
      }
      page++;
    });
  }
}

function moviePopular(req, res) {
  request(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      token +
      "&with_genres=878",
    function (err, response, body) {
      const movies = JSON.parse(body);
      res.render("movies/popular", {
        user: req.user,
        popularMovies: movies.results,
      });
    }
  );
}

async function show(req, res) {
  // Find all reviews for the selected movie
  const reviews = await Review.find({ movieId: req.params.id })
    .populate("user")
    .exec();
  const movieURL =
    "https://api.themoviedb.org/3/movie/" +
    req.params.id +
    "?api_key=" +
    token +
    "&language=en-US";
  request(movieURL, function (err, response, body) {
    const movieData = JSON.parse(body);
    res.render("movies/details", {
      movie: movieData,
      user: req.user,
      reviews: reviews,
    });
  });
}
