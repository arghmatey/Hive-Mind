const request = require("request");
const User = require("../models/user");

module.exports = {
  create,
  delete: removeMovie,
};

async function create(req, res) {
  try {
    const user = await User.findById(req.params.uid);
    req.body.id = req.params.mid;

    // saving movie id as the body of the watchlist object
    // TODO: evaluate and possibly redesign database structure
    user.watchList.push(req.body);
    user.save();

    res.redirect(`back`);
  } catch (error) {
    console.error(error);
  }
}

async function removeMovie(req, res) {
  try {
    const user = await User.findById(req.params.uid);
    req.body.id = req.params.mid;

    const movieIndex = user.watchList.findIndex(
      (movie) => movie.id === req.params.mid
    );
    user.watchList.splice(movieIndex, 1);
    user.save();

    res.redirect(`back`);
  } catch (error) {
    console.error(error);
  }
}
