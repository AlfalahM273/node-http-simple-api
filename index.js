const http = require("http");
const fsPromises = require('fs/promises');

const port = 3000

http.createServer( function(req, res){
    switch( req.url ){
        case "/":
            res.writeHead(200, {"Content-Type": "text/json"});            
            res.end( JSON.stringify({}));
            break;
        case "/foods":
            fsPromises.readFile( "./db/food.json" )
                .then( (result)=>{
                    res.writeHead(200, {"Content-Type": "text/json"});            
                    res.end( result );
                } )
                .catch( (err)=>{
                    res.writeHead(502, {"Content-Type": "text/json"});            
                    res.end( err );
                } );
            break;
        default :
            res.writeHead(404, {"Content-Type": "text/json"});
            res.end( JSON.stringify({"message" : "Not Found"}));
            break;
    }
})
.listen(3000, () => {
    console.log("start server on port "+ port);
})