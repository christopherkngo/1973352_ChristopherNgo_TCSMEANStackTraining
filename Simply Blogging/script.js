// Array used to populate the blogs section
var arr = new Array();

// This retrieves the array from local storage and puts it in the local array
function getBlogs() {
    var str = localStorage.getItem("localData");
    if (str != null) {
        arr = JSON.parse(str);
    }
}

// When a new blog is added, this inserts the data into an array and puts it into local storage
function addBlog() {
    // Retrieve array of blogs from local storage
    getBlogs();

    // Grab user inputs and put inside array to push to local storage
    var title = document.getElementById("textTitle").value;
    var desc = document.getElementById("textDesc").value;
    if (document.getElementById("imageID").files[0] != null) {
        var imageInfo = document.getElementById("imageID").files[0].name;

        arr.push({
            textTitle:title,
            textDesc:desc,
            imageID:imageInfo
        }); 
    } else {
        arr.push({
            textTitle:title,
            textDesc:desc,
            imageID:""
        }); 
    }

    localStorage.setItem("localData", JSON.stringify(arr));

    // Refresh webpage to load updated blogs list
    location.reload();
}

// This loads the blogs from local storage into the blogs section, this is called upon page load
function loadBlogs() {
    var arr1 = new Array();
    arr1 = JSON.parse(localStorage.getItem("localData"));

    if (arr1 != null) {
        var blogDiv = document.getElementById("blogDiv");
    
        for (i = 0; i < arr1.length; i++) {
            // If image selected, include in blog post, otherwise don't include image
            if (arr1[i].imageID != "") {
               var div = document.createElement("div");
               div.setAttribute("class", "divBorderClass");
               var divTitle = document.createElement("div");
               divTitle.innerHTML = '<h2>' + arr1[i].textTitle + '</h2>';
               var divDesc = document.createElement("div");
               divDesc.innerHTML = arr1[i].textDesc;
               var image = document.createElement("img");
               image.src = arr1[i].imageID;

               div.appendChild(divTitle);
               div.appendChild(divDesc);
               div.appendChild(image);
               blogDiv.appendChild(div);

            } else {
                var div = document.createElement("div");
                div.setAttribute("class", "divBorderClass");
                var divTitle = document.createElement("div");
                divTitle.innerHTML = '<h2>' + arr1[i].textTitle + '</h2>';
                var divDesc = document.createElement("div");
                divDesc.innerHTML = arr1[i].textDesc;

                div.appendChild(divTitle);
                div.appendChild(divDesc);
                blogDiv.appendChild(div);
            }
        }
    }  
}

// This clears the local storage, if storage is cleared reload page also
function deleteData() {
    localStorage.clear();
    location.reload();
}