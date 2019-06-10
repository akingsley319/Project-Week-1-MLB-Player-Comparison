// Called upon in loginPage.html to begin login process
function loginCheck(){
    event.preventDefault();
    var loginUser = new UserService().login();
}

// Called in userService.js on successful login
function logInSuccessful(){
    //Stores info locally to make sure it is okay to enter site
    localStorage.setItem("id", "ACCESS_GRANTED");

    console.log("Success!");
    window.location.replace("index.html");
};

// Called in userService on failed login
function logInFailed(){
    alert("Login Failed")
};

// Check for login allowance
function checkLogIn(){
    //localStorage.removeItem("id");
    var user = localStorage.getItem("id");
    if (user == "ACCESS_GRANTED"){
        console.log("User is Logged In");
    }
    else {
        console.log("User not Logged In");
        window.location.replace("loginPage.html");
    }
}

function logOut(){
    let confirmValue = confirm("Are You Sure?");
    if (confirmValue == true){
        localStorage.removeItem("id");
        window.location.replace("loginPage.html");
    }
}

// called upon in index.html to search for player
function findPlayer(){
    var player = new PlayerSearch().playerSearch();
}

// called upon in loadData.js to display retrieved information
function displayPlayer(displayInfo){
    // Remove "Player Not Found" message
    var para = document.getElementById("feedback");
    para.textContent = "";

    // grab elements to append table body
    var comparisonTable = document.getElementById("playerstats");
    console.log(displayInfo);
    var row = comparisonTable.insertRow();

    // Fill cells with stats
    for (element in displayInfo){
        let stat = Object.keys(displayInfo[element]);
        let col = document.createElement("td");

        col.textContent = displayInfo[element][stat];
        col.align = "center";
        row.append(col);

        // separation of player identifiers and player stats
        if (element<3){
            col.setAttribute('id', 'identification');
        }
    }

    // Create Delete button for row and assign attributes
    var button = document.createElement('button');
    button.textContent = "Remove";
    row.append(button);
    button.setAttribute('id', 'deletebutton');
    button.setAttribute('onclick', 'removeRow(this)');
    button.setAttribute('value', rowValue);
}

// Called by remove buttons for table to delete specific row
function removeRow(button){
    var row = button.parentNode.parentNode;
    var table = document.getElementById("playertable");
    table.deleteRow(button.parentNode.rowIndex);
}

// Decided function below was unneccessary
// Called by clear button to clear table of all player information
/*function clearTable(){
    let clear = confirm("Are You Sure You Wish To Clear This Table?");
    if (clear = true){
        var oldBody = document.getElementById("playerstats");
        var newBody = document.createElement('tbody');
        oldBody.parentNode.replaceChild(oldBody, newBody);
    }
}*/