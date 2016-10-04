var http = require("http");

// obj con info de solicitud
// obj con respuesta a user
// se ejecuta por cada peticion al server
var handler = function(request, response){
    console.log("Hola mundo");
    response.end("Peticion recibida");
};

var server = http.createServer(handler);
server.listen(8080);

// para ejecutar node hello.js
// acceso localhost:puerto
