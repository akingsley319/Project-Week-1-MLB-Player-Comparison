// User login information
class UserService {
    login(){
        // Retrieve Login information
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        // Organize Login information
        var information = {"username": username, "password": password};

        var loginCheck = new LoginDatabase().stored(information);
    }
}

// Stored login information
class LoginDatabase {
    stored(loginInfo){
        var storedInfo = [
            {"username": "abc123", "password": "abc123"},
            {"username": "xyz098", "password": "xyz098"},
            {"username": "username", "password": "password"}
        ];

        var check = new CrossCheck().crossCheck(loginInfo, storedInfo);
    }
}

// Checks login information with stored combinations
class CrossCheck{
    crossCheck(loginInfo, storedInfo){
        for (var element in storedInfo){
            let userName = storedInfo[element].username;
            let passWord = storedInfo[element].password;
            if(userName == loginInfo.username && passWord == loginInfo.password){
                logInSuccessful();
                return false;
            }
        }
        logInFailed();
    }
}