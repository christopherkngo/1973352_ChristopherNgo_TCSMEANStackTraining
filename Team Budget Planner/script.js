// Array used to populate the annual budget table
var arr = new Array();

// When form is submitted, this inserts the data into an array and puts it into local storage
function insertData() {
    getData();

    var budget = document.getElementById("budget").value;
    budget = parseInt(budget);
    document.getElementById("budget").value = budget;

    arr.push({
        clientName:document.getElementById("clientName").value,
        projectName:document.getElementById("projectName").value,
        budget:document.getElementById("budget").value
    }); 

    localStorage.setItem("localData", JSON.stringify(arr));
}

// This retrieves the array from local storage and puts it in the local array
function getData() {
    var str = localStorage.getItem("localData");
    if (str != null) {
        arr = JSON.parse(str);
    }
}

// This clears the local storage, if storage is cleared reload page also
function deleteData() {
    localStorage.clear();
    location.reload();
}

// This loads data from local storage into the annual budget table, updates total budget
function loadTable() {
    var arr1 = new Array();
    arr1 = JSON.parse(localStorage.getItem("localData"));

    var tbl = document.getElementById("teamsTable");

    var total = 0;
    
    for (i = 0; i < arr1.length; i++) {
        var row = tbl.insertRow();
        
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();

        cell1.innerHTML = arr1[i].clientName;
        cell2.innerHTML = arr1[i].projectName;
        cell3.innerHTML = "$" + arr1[i].budget;

        total += parseInt(arr1[i].budget);
    }
    
    document.getElementById("totalBudget").innerHTML = "Total Budget: $" + total;
}
