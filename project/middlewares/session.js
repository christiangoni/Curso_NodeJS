module.exports = function(req, res, next) {
    if (req.session.user_id) {
        res.redirect("/login");
        console.log("redirige puto");
    } else {
        console.log("por que no");
        next();
    }
}