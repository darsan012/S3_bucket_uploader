// routes for handling login and logout
import express from "express";
import bcrypt from "bcryptjs";

const loginRouter = new express.Router();

// for rendering login page
loginRouter.get("/login", (req, res) => {
  res.render("login", { error: req.flash("error") }); // sends flash error message if error occurs
});

export default loginRouter;
