var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/myproject");

// validaciones se ejecutan en metodo save
var posibles_valores = ["M", "F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w{2,3})+$/, "Coloca email valido"];
var user_schema = new Schema({
    name: String,
    username: { type: String, required: true, maxlength: [50, "Username maximo de 50 carac"] },
    password: String,
    //email: {type: String, required: true},
    email: { type: String, required: "El correo es obligatorio", match: email_match },
    birth: Date,
    age: { type: Number, min: [18, "Edad minima de 18"], max: 100 },
    // si sex != values =>message
    sex: {
        type: String,
        enum: { values: posibles_valores, message: "Opcion no valida, F o M" }
    }
});

user_schema.virtual("password_confirmation").get(function() {
    return this.p_c;
}).set(function(password) {
    this.p_c = password;
});

// constructor de modelo a mapear
var User = mongoose.model("User", user_schema);

module.exports.User = User;