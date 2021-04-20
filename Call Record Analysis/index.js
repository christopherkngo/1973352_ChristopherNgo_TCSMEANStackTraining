let fs = require('fs');
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err1,client)=>{
    let db = client.db("meanstack");
    if (!err1) {
        console.log("Connected sucessfully");

        // Read in the call data JSON file
        fs.readFile('./call_data.json', 'utf-8', function(err2, data) {
            if (err2) throw err2

            // Parse JSON file into a JSON object
	        var json = JSON.parse(data);

            // For each entry in the JSON file, create an item and insert each item one by one into the mongodb database
            for (let i = 0; i < json.length; i++) {
                var item = json[i];

                var insertItem = {
                    _id: item._id,
                    source: item.source,
                    destination: item.destination,
                    sourceLocation: item.sourceLocation,
                    destinationLocation: item.destinationLocation,
                    callDuration: item.callDuration,
                    roaming: item.roaming,
                    callCharge: item.callCharge
                };

                // This will only insert unique entries with "upsert: true" to stop duplicate entries
                db.collection("callRecords").insertOne(insertItem, {upsert: true}, function(err3, res) {
                    if (err3) throw err3
                    console.log(insertItem);
                    console.log("Record inserted sucessfully");
                });
            
            }
        });
    } else {
        console.log("Error: " + err);
    }
    // This causes Topology error so use ctrl + C after items are inserted
    //client.close();
});