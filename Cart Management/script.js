// Array used to populate the items section
var arr = new Array();

// This retrieves the array from local storage and puts it in the local array
function getItems() {
    var str = localStorage.getItem("localData");
    if (str != null) {
        arr = JSON.parse(str);
    }
}

// When a new item is added, this inserts the data into an array and puts it into local storage
function addItem(itemNum) {
    // Retrieve array of items from local storage
    getItems();

    var price;
    // Grab user inputs and put inside array to push to local storage
    if (itemNum == 1) {
        price = document.getElementById("itemPrice1").value;
        price = parseInt(price);
        document.getElementById("itemPrice1").value = price;
        arr.push({
            itemName:document.getElementById("itemName1").value,
            itemPrice:document.getElementById("itemPrice1").value
        }); 
    } else if (itemNum == 2) {
        price = document.getElementById("itemPrice2").value;
        price = parseInt(price);
        document.getElementById("itemPrice2").value = price;
        arr.push({
            itemName:document.getElementById("itemName2").value,
            itemPrice:document.getElementById("itemPrice2").value
        }); 
    } else if (itemNum == 3) {
        price = document.getElementById("itemPrice3").value;
        price = parseInt(price);
        document.getElementById("itemPrice3").value = price;
        arr.push({
            itemName:document.getElementById("itemName3").value,
            itemPrice:document.getElementById("itemPrice3").value
        }); 
    } else if (itemNum == 4) {
        price = document.getElementById("itemPrice4").value;
        price = parseInt(price);
        document.getElementById("itemPrice4").value = price;
        arr.push({
            itemName:document.getElementById("itemName4").value,
            itemPrice:document.getElementById("itemPrice4").value
        }); 
    }

    localStorage.setItem("localData", JSON.stringify(arr));

    // Refresh webpage to load updated cart size
    location.reload();
}

// This loads data from local storage into the shopping cart, updates total price
function loadItems() {
    var arr1 = new Array();
    arr1 = JSON.parse(localStorage.getItem("localData"));

    var tbl = document.getElementById("cartTable");

    var total = 0;
    
    for (i = 0; i < arr1.length; i++) {
        var row = tbl.insertRow();
        
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();

        cell1.innerHTML = arr1[i].itemName;
        cell2.innerHTML = "$" + arr1[i].itemPrice;

        total += parseInt(arr1[i].itemPrice);
    }
    
    document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
}

// This displays/updates the current cart size
function getCartSize() {
    var arr1 = new Array();
    arr1 = JSON.parse(localStorage.getItem("localData"));

    if (arr1 != null) {
        document.getElementById("cartSize").innerHTML = "Cart Size: " + arr1.length;
    }
}

// This clears the local storage, if storage is cleared reload page also
function deleteData() {
    localStorage.clear();
    location.reload();
}