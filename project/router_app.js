var express = require("express");

var router = express.Router();

// app.com/app/
router.get("/", function(req, res) {
    /* Buscar usuario */
    console.log("get chungo");
    res.render("app/home");
});

module.exports = router;