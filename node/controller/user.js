const userService = require('../services/user')

module.exports = {
    register,
    authenticate
};

function register(req, res, next) {
    username = req.body["UserName"];
    if (username === undefined) {
        username = req.body["userName"];
    }

    fName = req.body["FirstName"];
    if (fName === undefined) {
        fName = req.body["firstName"];
    }

    lName = req.body["LastName"];
    if (lName === undefined) {
        lName = req.body["lastName"];
    }

    email = req.body["Email"];
    if (email === undefined) {
        email = req.body["email"];
    }

    password = req.body["Password"];
    if (password === undefined) {
        password = req.body["password"];
    }

    console.log("Controller User/register");

    userService.register(username, password, fName, lName, email, res);
}

function authenticate(req, res, next) {
    username = req.body["UserName"];
    if (username === undefined) {
        username = req.body["userName"];
    }

    if (username === undefined) {
        username = req.body["username"];
    }

    password = req.body["Password"];
    if (password === undefined) {
        password = req.body["password"];
    }

    console.log("Controller User/authenticate");

    userService.authenticate(username, password, res);
}
