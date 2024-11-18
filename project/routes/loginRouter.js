// routes for handling login and logout
import express from "express";
import bcrypt from "bcryptjs";

const loginRouter = new express.Router();

// for rendering login page
loginRouter.get("/login", (req, res) => {
  res.render("login", { error: req.flash("error") }); // sends flash error message if error occurs
});

// post request to the /login route,
loginRouter.post("/login", (req, res) => {
  const { username, pin } = req.body;
  if (
    username === process.env.USER_NAME &&
    bcrypt.compareSync(pin, process.env.USER_PIN)
  ) {
    req.session.isAuthenticated = true;
    return res.redirect("/upload");
  }
  req.flash("error", "Invalid credentials");
  res.redirect("/login");
});

export default loginRouter;
