var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// acceso a modelo BBDD exportado
var User = require("./models/user").User;
// manejar sesiones
var session = require("express-session");
// rutas modulares
var router_app = require("./router_app");
var session_middleware = require("./middlewares/session");

app.use(express.static('public'));
app.use(express.static('assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "1654erfrfeff89w4e8f49f",
    resave: false,
    saveUninitialized: false
}));

app.use("/app", session_middleware);
app.use("/app", router_app);

app.set("view engine", "pug");

/* usuario logueado => /app */

/* usuario no logueado => / */
app.get('/', function(req, res) {
    console.log(req.session.user_id);
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
    User.findOne({ email: req.body.email, password: req.body.password }, "", function(err, user) {
        console.log(user);
        req.session.user_id = user._id;
        res.send("VAMOS, Sesion cread");
    });
});

app.listen(8080);