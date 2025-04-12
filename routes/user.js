const express = require("express");
// const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");


const userController = require("../controllers/users.js");
const { route } = require("./listing.js");


router
    .route("/signup")
    .get( userController.renderSignupForm)
    .post(wrapAsync(userController.signup)
    );

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
    userController.login
    );




// // GET Login page
// router.get("/login", saveRedirectUrl, );

// // POST Login
// router.post(
//     "/login",
//     passport.authenticate("local", {
//         failureRedirect: "/login",
//         failureFlash: true,
//     }),
//     (req, res) => {
//         req.flash("success", "Welcome to Wanderlust! You are logged in!");
//         const redirectUrl = req.session.redirectUrl || "/listings";
//         delete req.session.redirectUrl;
//         res.redirect(redirectUrl);
//     }
// );


router.get("/logout", userController.logout);

module.exports = router;