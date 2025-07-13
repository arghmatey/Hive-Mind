const User = require("../models/user");

module.exports = {
  show,
};

async function show(req, res) {
  try {
    const showUser = await User.findById(req.params.id).populate("watchList");

    console.log(showUser);
    if (!showUser) return res.redirect("/");
    res.render("users/show", { user: showUser });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}
