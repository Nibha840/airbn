module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path, "..", req.originalUrl);
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = res.originalUrl;
        req.flash("error", "you must be loggin in to create listings!");
        return res.redirect("/login");
    }
    next();
};

// module.exports.saveRedirectUrl = (req, res, next) => {
//     if(req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };

module.exports.isLoggedIn = (req,res,next) =>{
    console.log("original url " , req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login")
    }
    next();
};