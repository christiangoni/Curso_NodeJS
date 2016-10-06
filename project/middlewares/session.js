module.exports = function(req, res, next) {
    if (!req.session.user_id) {
        console.log("Acceso restringido");
        res.redirect("/login");
    } else {
        next();
    }
}