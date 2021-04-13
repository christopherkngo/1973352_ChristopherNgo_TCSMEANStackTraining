let http = require("http");
let url = require("url");
let fs = require('fs');
let port = 9999;
let taskInfo = `
    <h1><b>TASK PLANNER</b></h1>
    <h2><u>Add Task</u></h2>
    <form action="/store" method="get">
        <label>Emp ID:</label>
        <input type="text" placeholder="Employee ID" name="empID" style="width: 170px;" required/><br/>
        <label>Task ID:</label>
        <input type="text" placeholder="Task ID" name="taskID" style="width: 170px;" required/><br/>
        <label>Task:</label>
        <input type="text" placeholder="Task" name="task" style="width: 170px;" required/><br/>
        <label>Deadline:</label>
        <input type="date" placeholder="Deadline" name="deadline" style="width: 170px;" required/><br/>
        <input type="submit" value="Add Task"/>
        <input type="reset" value="reset"/>
    </form>
    <h2><u>Delete Task</u></h2>
    <form action="/delete" method="get">
        <label>Task ID:</label>
        <input type="text" placeholder="Task ID" name="taskID" style="width: 170px;"/><br/>
        <input type="submit" value="Delete Task"/>
        <input type="reset" value="reset"/>
    </form>
    <h2><u>List Task</u></h2>
    <form action="/display">
        <input type="submit" value="List All Tasks"/>
    </form>
`;

let server = http.createServer((req,res)=> {
    //console.log(url.parse(req.url));
    if (req.url != "/favicon.ico") {
        var pathInfo = url.parse(req.url,true).pathname;
        if(req.url=="/"){
            res.setHeader("content-type","text/html");
            res.end(taskInfo);
        } else if (pathInfo=="/store") {
            res.setHeader("content-type","text/html");
            
            // This allows the user to return to the home page after submitting a task
            let returnOption = `
                <br/>
                <a href="/">
                    <button>Return To Tasks</button>
                </a>
            `;
            
            var data = url.parse(req.url,true).query;
            var empID = data.empID;
            var taskID = data.taskID;
            var task = data.task;
            var deadline = data.deadline;

            fs.readFile('./tasks.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var json = JSON.parse(data);
            
                json.tasks.push({
                    empId: empID,
                    taskId: taskID,
                    task: task,
                    deadline: deadline
                });
            
                fs.writeFile('./tasks.json', JSON.stringify(json), 'utf-8', function(err) {
                    if (err) throw err
                    //console.log('Task has been recorded in the JSON');
                });
            });

            res.write("Task has been sucessfully added.");
            res.end(returnOption);
        } else if (pathInfo=="/delete") {
            res.setHeader("content-type","text/html");

            // This allows the user to return to the home page after submitting a task
            let returnOption = `
                <br/>
                <a href="/">
                    <button>Return To Tasks</button>
                </a>
            `;
            
            var data = url.parse(req.url,true).query;
            var taskID = data.taskID;

            fs.readFile('./tasks.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var json = JSON.parse(data);
            
                json.tasks = json.tasks.filter((task)=> {return task.taskId != taskID});
            
                fs.writeFile('./tasks.json', JSON.stringify(json), 'utf-8', function(err) {
                    if (err) throw err
                    //console.log('TaskID has been removed from the JSON');
                });
            });

            res.write("All tasks with the Task ID: " + taskID + " have been removed.");
            res.end(returnOption);
        } else if (pathInfo=="/display") {
            res.setHeader("content-type","text/html");

            let showTable = `
                <h2><u>List of Tasks</u></h2>
                <table class="taskTable">
                    <tr>
                        <th>Employee ID</th>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Deadline</th>
                    </tr>
            `;

            fs.readFile('./tasks.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var json = JSON.parse(data);
            
                for (let i = 0; i < json.tasks.length; i++) {
                    showTable += `
                        <tr>
                            <td>${json.tasks[i].empId}</td>
                            <td>${json.tasks[i].taskId}</td>
                            <td>${json.tasks[i].task}</td>
                            <td>${json.tasks[i].deadline}</td>
                        </tr>
                    `;
                }

                
                showTable += `
                    </table>
                    <a href="/">
                        <button>Return To Tasks</button>
                    </a>
                `;
                
                res.end(showTable);
            });
        } else {
            res.write("An error has occured, please restart and try again");
            res.end();
        }
    }
});
server.listen(port,()=>console.log(`running on port num ${port}`));
