var express = require("express");

var router = express.Router();

// app.com/app/
router.get("/", function(req, res) {
    /* Buscar usuario */
    res.render("app/home");
});

/** REST */
router.get("/img/new", function(req, res) {
    res.render("app/img/new");
});
router.get("/img/:id/edit", function(req, res) {

});
// imagen concreta id
router.route("/img/:id")
    .get(function(req, res) {

    })
    .put(function(req, res) {

    })
    .dele te(function(req, res) {

    });
// coleccion imagenes
router.route("/img/:id")
    .get(function(req, res) {

    })
    .put(function(req, res) {

    });

module.exports = router;