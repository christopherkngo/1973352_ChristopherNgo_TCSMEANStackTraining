let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=> {
    socket.on("chat",(name, msg)=> {
        console.log(name + ",");
        console.log(msg);

        
        var item = {
            name: name,
            message: msg
        };

        mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
            if(!err1){
                let db = client.db("meanstack");
                db.collection("messages").insertOne(item,(err2,result)=>{
                    if(!err2){
                        // Remove these to remove from console
                        console.log(item);
                        console.log("message has been added");
                    }else {
                        console.log(err2.message);
                    }
                    client.close();    
                });
            }
        });
        
    });
});

http.listen(9090,()=>console.log('server running on port number 9090'));


