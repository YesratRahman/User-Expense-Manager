// https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/#handling-user-sign-in
module.exports = {
    register,
    authenticate,
    isAuthenticated
};

const jwtKey = "fooBar";
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const jwt = require("jsonwebtoken")
const saltRounds = 10;

let db = new sqlite3.Database('./data.db',
    (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Users page is connecting to database");
    });

function createTable() {
    const sql = "CREATE TABLE IF NOT EXISTS USERS(ID INTEGER PRIMARY KEY,username STRING UNIQUE NOT NULL, hash STRING NOT NULL, firstName STRING NOT NULL, lastName STRING NOT NULL, Email STRING NOT NULL);"
    db.run(sql);
}

async function register(username, password, firstname, lastname, email, res) {
    createTable();
    console.log(password);
    let hash = bcrypt.hashSync(password, 10 );

    await db.run("INSERT INTO USERS (username, hash, firstName, lastName, Email) VALUES (?,?,?,?,?);", username, hash, firstname, lastname, email, function (err) {
        if (err) {
            res.send("Registration failed: " + err);
            return ;
        }
        res.send("Registration success");
    })
}

async function authenticate(username, password, res) {
    db.get("SELECT username, hash FROM USERS WHERE username = ?;", username, (err, row) => {
        console.log(row);
        if (err) {
            res.send("Authentication database failed.");
            return ;
        }

        if (bcrypt.compareSync(password, row.hash)) {

            const token = jwt.sign({ username }, jwtKey, {
                algorithm: "HS256",
                expiresIn: 3600,
            })

            res.send(token);
            return;
        }
        res.send("Authentication failed.");
    });
}

function isAuthenticated(req, res, next) {
    if (req.token === undefined) {
        res.sendStatus(403);
    }

    try {
        jwt.verify(req.token, jwtKey);
        next();
    }
    catch (e) {
        //If there is any error say the user is not authenticated:
        return res.status(401).send("The user could not be authenticated!").end();
    }
}
