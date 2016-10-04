var http = require("http"),
    fs = require("fs");

/*var html = fs.readFileSync("./index.html");
http.createServer(function(req,res){
    res.write(html);
    res.end();
}).listen(8080);*/

// asincrona
fs.readFileSync("./index.html",function(err,html){
http.createServer(function(req,res){
    res.write(html);
    res.end();
}).listen(8080);
});

