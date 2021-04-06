let obj = require("readline-sync");
let firstName = obj.question("Enter your first name: ");
//console.log("Your first name is "+ firstName);
let lastName = obj.question("Enter your last name: ");
//console.log("Your last name is "+ lastName);
let gender = obj.question("Enter your gender: ");
//console.log("Your gender is "+ gender);
let email = obj.question("Enter your email: ");
//console.log("Your first name is "+ email);

var fs = require('fs');

fs.readFile('./logs.json', 'utf-8', function(err, data) {
	if (err) throw err

	var json = JSON.parse(data);

    var timeStamp = new Date().toUTCString();

	json.logs.push({
		firstName: firstName,
		lastName: lastName,
        gender: gender,
        email: email,
        timestamp: timeStamp
	});

    console.log("Log to be added to JSON:");
	console.log(json);

	fs.writeFile('./logs.json', JSON.stringify(json), 'utf-8', function(err) {
		if (err) throw err
		console.log('Log has been recorded in the JSON');
	});
});