var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// BBDD
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Conection to BBDD
mongoose.connect("mongodb://localhost/myproject");
// BBDD's Schema  = collection = table
var userSchemaJSON = {
    email: String,
    password: String
};
var user_schema = new Schema(userSchemaJSON);
// modelo y schema a donde se mapea
var User = mongoose.model("User", user_schema);

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
    // en arg2 = doc = respuesta a consulta
    User.find(function(err, doc) {
        console.log(doc);
    });
    res.render('login');
});

app.post("/users", function(req, res) {
    /*
    console.log("contraseña = " + req.body.password);
    console.log("email = " + req.body.email);*/
    var user = new User({ email: req.body.email, password: req.body.password });
    user.save(function() {
        res.send("Guardamos tus datos");
    });
    //res.send("Datos recibidos");
})

app.listen(8080);