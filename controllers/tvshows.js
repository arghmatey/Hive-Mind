const request = require("request");
const token = process.env.API_KEY;
const Review = require("../models/review");
const rootURL = "https://api.tmdb.org/3/search/tv?api_key=" + token + "&query=";

module.exports = {
  tvPopular,
  show,
};

function tvPopular(req, res) {
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
  // Find all reviews for the selected tv show
  const reviews = await Review.find({ movieId: req.params.id })
    .populate("user")
    .exec();
  const tvURL =
    "https://api.themoviedb.org/3/tv/" +
    req.params.id +
    "?api_key=" +
    token +
    "&language=en-US";
  request(tvURL, function (err, response, body) {
    const tvData = JSON.parse(body);
    res.render("tvshows/details", {
      tv: tvData,
      user: req.user,
      reviews: reviews,
    });
  });
}
