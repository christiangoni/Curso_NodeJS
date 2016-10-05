var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// BBDD
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Conection to BBDD
mongoose.connect("mongodb:localhost/myproject");
// BBDD's Schema
var userSchemaJSON = {
    email: String,
    password: String
};
var user_schema = new Schema(userSchemaJSON);

// usar middleware para servir archivos estaticos
// archivos dentro de carpeta assets y public son accesibles
app.use(express.static('public'));
app.use(express.static('assets'));

app.use(bodyParser.json()); // peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "pug");

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post("/users", function(req, res) {
    console.log("contraseña = " + req.body.password);
    console.log("email = " + req.body.email);
    res.send("Datos recibidos");
})

app.listen(8080);