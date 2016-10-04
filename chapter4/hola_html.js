var http = require("http"),
    fs = require("fs");



// res = http.serverresponse
http.createServer(function(req,res){
    fs.readFile("./index.html",function(err,html){
        // 1 = status 200=ok,400=not found,500=error
        // probar en consola curl -I localhost:8080
        res.writeHead(200,{"Content-Type":"text/json"})
        res.write(JSON.stringfy({nombre:"Chris",username:"Mimis"}));
        res.end();
    });
}).listen(8080);

