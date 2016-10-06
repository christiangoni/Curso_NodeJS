var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// acceso a modelo BBDD exportado
var User = require("./models/user").User;

app.use(express.static('public'));
app.use(express.static('assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "pug");

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/signup', function(req, res) {
    User.find(function(err, doc) {
        console.log(doc);
    });
    res.render('signup');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post("/users", function(req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });
    console.log(user.password_confirmation);
    // save using promises
    user.save().then(function(us) {
        // then => cuando retorna correctamen
        res.send("Guardo correctamente");
    }, function(err) {
        if (err) {
            console.log(String(err));
            res.send("No se pudo guarda la info");
        }
    });
});

app.post("/sessions", function(req, res) {
    // devuelve array de docs que cumple condicion
    // query, [campos que queremos,] callback
    User.findOne({ email: req.body.email, password: req.body.password }, "", function(err, doc) {
        console.log(doc);
        res.send("VAMOS");
    });
});

app.listen(8080);