let mongoClient = require("mongodb").MongoClient;
let dbUrl = "mongodb://localhost:27017";
let http = require("http");
let url = require("url");
let fs = require('fs');
let port = 9999;
let taskInfo = `
    <h1><b>COURSE PLATFORM</b></h1>
    <h2><u>Add Course</u></h2>
    <form action="/add" method="get">
        <label>Course ID:</label>
        <input type="text" placeholder="Course ID" name="courseID" style="width: 170px;" required/><br/>
        <label>Coruse Name:</label>
        <input type="text" placeholder="Course Name" name="courseName" style="width: 170px;" required/><br/>
        <label>Description:</label>
        <input type="text" placeholder="Description" name="desc" style="width: 170px;" required/><br/>
        <label>Amount:</label>
        <input type="number" placeholder="Course Amount" name="courseAmount" style="width: 170px;" required/><br/>
        <input type="submit" value="Add Course"/>
        <input type="reset" value="Reset"/>
    </form>
    <h2><u>Update Course</u></h2>
    <form action="/update">
        <label>Course ID:</label>
        <input type="text" placeholder="Course ID" name="courseID" style="width: 170px;"/><br/>
        <label>Amount:</label>
        <input type="number" placeholder="Course Amount" name="courseAmount" style="width: 170px;" required/><br/>
        <input type="submit" value="Update Course"/>
    </form>
    <h2><u>Delete Course</u></h2>
    <form action="/delete" method="get">
        <label>Course ID:</label>
        <input type="text" placeholder="Course ID" name="courseID" style="width: 170px;"/><br/>
        <input type="submit" value="Delete Course"/>
        <input type="reset" value="Reset"/>
    </form>
    <h2><u>Fetch Courses</u></h2>
    <form action="/fetch">
        <input type="submit" value="List All Courses"/>
    </form>
`;
let server = http.createServer((req,res)=> {

    //console.log(url.parse(req.url));
    if (req.url != "/favicon.ico") {
        var pathInfo = url.parse(req.url,true).pathname;
        if(req.url=="/"){
            res.setHeader("content-type","text/html");
            res.end(taskInfo);
        } else if (pathInfo=="/add") {
            res.setHeader("content-type","text/html");
            
            // This allows the user to return to the home page after submitting a task
            let returnOption = `
                <br/>
                <a href="/">
                    <button>Return To Courses</button>
                </a>
            `;
            
            var data = url.parse(req.url,true).query;
            var courseID = data.courseID;
            var courseName = data.courseName;
            var description = data.desc;
            var courseAmount = data.courseAmount;

            var item = {
                courseID: courseID,
                courseName: courseName,
                description: description,
                courseAmount: courseAmount
            };

            mongoClient.connect(dbUrl, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1){
                    let db = client.db("meanstack");
                    db.collection("courses").insertOne(item,(err2,result)=>{
                        if(!err2){
                            console.log(item);
                            console.log("Course has been added");
                        }else {
                            console.log(err2.message);
                        }
                        client.close();    
                    });
                }
            });

            res.write("Course has been sucessfully added.");
            res.end(returnOption);
        } else if (pathInfo=="/update") {
            res.setHeader("content-type","text/html");
            
            // This allows the user to return to the home page after submitting a task
            let returnOption = `
                <br/>
                <a href="/">
                    <button>Return To Courses</button>
                </a>
            `;

            var data = url.parse(req.url,true).query;
            var courseID = data.courseID;
            var courseAmount = data.courseAmount;

            mongoClient.connect(dbUrl, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1){
                    let db = client.db("meanstack");
                    db.collection("courses").updateOne({courseID:courseID},{$set:{courseAmount:courseAmount}},(err2,result)=>{
                        if(!err2){
                            if(result.modifiedCount > 0){
                                console.log("Course updated successfully")
                            }else {
                                console.log("Course didn't update");
                            }
                        }else {
                            console.log(err2.message);
                        }
                        client.close();    
                    });
                }
            });

            res.write("Course with the Course ID: " + courseID + " has been updated.");
            res.end(returnOption);
        } else if (pathInfo=="/delete") {
            res.setHeader("content-type","text/html");

            // This allows the user to return to the home page after submitting a task
            let returnOption = `
                <br/>
                <a href="/">
                    <button>Return To Courses</button>
                </a>
            `;
            
            var data = url.parse(req.url,true).query;
            var courseID = data.courseID;

            mongoClient.connect(dbUrl, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1){
                    let db = client.db("meanstack");
                    db.collection("courses").deleteOne({courseID:courseID},(err2,result)=>{
                        if(!err2){
                            if(result.deletedCount > 0){
                                console.log("Course deleted successfully")
                            }else {
                                console.log("Course not present")
                            }
                        }
                        client.close();    
                    });
                }
            });

            res.write("Course with the Course ID: " + courseID + " has been removed.");
            res.end(returnOption);
        } else if (pathInfo=="/fetch") {
            res.setHeader("content-type","text/html");

            let showTable = `
                <h2><u>List of Courses</u></h2>
                <table class="courseTable">
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
            `;

            mongoClient.connect(dbUrl, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1){
                    let db = client.db("meanstack");
                    db.collection("courses").find({}).toArray(function(err2, result) {
                        if (err2) throw err2

                        for (let i = 0; i < result.length; i++) {
                            showTable += `
                                <tr>
                                    <td>${result[i].courseID}</td>
                                    <td>${result[i].courseName}</td>
                                    <td>${result[i].description}</td>
                                    <td>${result[i].courseAmount}</td>
                                </tr>
                            `;
                        }
                        showTable += `
                            </table>
                            <a href="/">
                                <button>Return To Courses</button>
                            </a>
                        `;
                        
                        client.close();

                        res.end(showTable);
                    });
                }
            });
        } else {
            res.write("An error has occured, please restart and try again");
            res.end();
        }
    }
});
server.listen(port,()=>console.log(`running on port num ${port}`));
