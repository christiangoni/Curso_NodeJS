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
    Image.findById(req.params.id, function(err, imagen) {
        console.log(imagen._id);
        res.render("app/img/edit", { image: imagen });
    })

});
// imagen concreta id
router.route("/img/:id")
    .get(function(req, res) {
        Image.findById(req.params.id, function(err, imagen) {
            res.render("app/img/show", { image: imagen });
        })
    })
    .put(function(req, res) {
        Image.findById(req.params.id, function(err, imagen) {
            imagen.title = req.body.title;
            imagen.save(function(err) {
                if (!err) {
                    res.render("app/img/show", { imagen: imagen });
                } else {
                    res.render("app/img/" + imagen._id + "/edit", { imagen: imagen });
                }
            })
            res.render("app/img/show", { image: imagen });
        })
    })
    .delete(function(req, res) {
        Image.findOneAndRemove({
            _id: req.params.id,
            function(err) {
                if (!err) {
                    res.redirect("/app/img");
                } else {
                    console.log(err);
                    res.redirect("/app/img" + req.params.id);
                }
            }
        })
    });
// coleccion imagenes
router.route("/img")
    .get(function(req, res) {
        Image.find({}, function(err, imgs) {
            // "template",{variable_a_usar_en_template: variable_coleccion}            
            if (err) {
                res.redirect("/app");
                return;
            }
            console.log(imgs);
            res.render("app/img/index", { img_collection: imgs });
        });
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