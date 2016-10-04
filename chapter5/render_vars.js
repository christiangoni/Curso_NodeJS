var http = require("http"),
    fs = require("fs");

http.createServer(function(req,res){
    fs.readFile("./index.html",function(err,html){
        var html_string = html.toString();
        var nombre = "Christian";
        //expresion regular buscq vqlor entre {}
        var variables = html_string.match(/[^\{\}]+(?=\})/g); 
        // variables = ["nombre"]
        for(var i = variables.length -1; i>=0; i--){
            // evalua si se corresponde con alguna variable definida aqui
            var value = eval(variables[i]);
            // reemplazar {loquesea} por el contenido de la variable
            html_string = html_string.replace("{"+variables[i]+"}",value);   
        }        

        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(html_string);
        res.end();
    });
}).listen(8080);
