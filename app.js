import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import { fileURLToPath } from "url";

import loginRouter from "./project/routes/loginRouter.js";
import uploadRouter from "./project/routes/uploadRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
// using pug as view engine
app.set("view engine", "pug");

// mapping to views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "project", "public")));

app.set("views", path.join(__dirname, "project", "views"));

// middleware
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

app.use("/upload", uploadRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
