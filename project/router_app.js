var express = require("express");

var router = express.Router();

var Image = require("./models/imgs");

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
        Image.findById(req.params.id, function(err, imagen) {
            console.log("-------->" + imagen.title);
            res.render("app/img/show", { image: imagen });
        })
    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    });
// coleccion imagenes
router.route("/img")
    .get(function(req, res) {

    })
    .post(function(req, res) {
        var data = {
            title: req.body.title
                //file = req.body.file;
        }
        var image = new Image(data);
        image.save(function(err) {
            if (!err) {
                res.redirect("/app/img/" + image._id);
            } else {
                console.log(err);
                res.render(err);
            }
        })
    });

module.exports = router;