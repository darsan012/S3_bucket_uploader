// middleware to check whether user is logged in or not
export const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) return next(); // proceeds if user is logged in
  // if user is not logged in goes back to login page
  res.redirect("/login");
};
