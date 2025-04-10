const express = require("express");
// const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");    
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
})
);

// router.get("/login", (req, res) => {
//     res.render("users/login.ejs");
// });

// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local", {
//         failureRedirect: "/login",
//         failureFlash: true,
//     }),
//     async (req, res) => {
//         req.flash("success", "Welcome to Wanderlust! You are logged in!");
//         let redirectUrl = res.locals.redirectUrl || "/listings";
//         res.redirect(redirectUrl);
//     }
// );



// GET Login page
router.get("/login", saveRedirectUrl, (req, res) => {
    res.render("users/login.ejs");
});

// POST Login
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome to Wanderlust! You are logged in!");
        const redirectUrl = req.session.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    }
);


router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;