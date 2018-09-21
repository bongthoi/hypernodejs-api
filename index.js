var express =   require("express");
var bodyParser  =   require("body-parser");

/** */
var app =express();
var router=require("./src/routers/router");
var api_config=require("./config/api_config.json");

/******************************** */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});


/** */
router(app);


/** */
var server  =app.listen(api_config.api_port,function(){console.log("Listening locally on port "+server.address().port);});