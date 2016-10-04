function parse(req){
    var array_params = [], params = {};

    // tenemos parametros /?nombre=chris&data=algo
    if (req.url.indexOf("?") > 0){
            var url_data = req.url.split("?"); // ['/','nombre=Chris','data=Algo'']
            array_params = url_data[1].split("&"); // [nombre=asdad,data=algo]
    }

    for( var i = array_params.length-1; i>=0; i--){
        var param = array_params[i]; // [nombre=chris]
        var param_data = param.split("="); // [nombre,christian]
        params[param_data[0]] = param_data[1]; // {nombre:chris}
    };
    // json {nombre:chris}
    return params;
}
module.exports.parse = parse;
