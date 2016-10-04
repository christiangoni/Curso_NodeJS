var http = require("http"),
    fs = require("fs");

http.createServer(function(req,res){

    if(req.url.indexOf("favicon.ico") > 0){ return;}

    fs.readFile("./index.html",function(err,html){
        var nombre = "";
        var array_params = [], params = {};
        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g); 
        // recibimos parametros
        if (req.url.indexOf("?") > 0){
            // "/?nombre=chris&data=algo
            var url_data = req.url.split("?"); // ['/','nombre=Chris','data=Algo'']
            array_params = url_data[1].split("&"); // [nombre=asdad,data=algo]
        }
        for( var i = array_params.length-1; i>=0; i--){
            var param = array_params[i]; // [nombre=chris]
            var param_data = param.split("="); // [nombre,christian]
            params[param_data[0]] = param_data[1]; // {nombre:chris}
        }

        for(var i = variables.length -1; i>=0; i--){
            var variable = variables[i];
            var value = eval(variables[i]);
            html_string = html_string.replace("{"+variables[i]+"}",params[variable]);   
        }        
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(html_string);
        res.end();
    });
}).listen(8080);
