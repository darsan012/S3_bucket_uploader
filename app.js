import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import { fileURLToPath } from "url";

import loginRouter from "./project/routes/loginRouter.js";
dotenv.config();

const app = express();
// using pug as view engine
app.set("view engine", "pug");
app.use(express.static("public"));

// mapping to views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "project", "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
// for managing the session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// for showing the server messages
app.use(flash());
// using the login routes for authentication
app.use("/", loginRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
