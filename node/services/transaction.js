const { response } = require('express');

module.exports = {
    createTransaction,
    changeTransaction,
    deleteTransaction,
    getTransactions
};

const sqlite3 = require('sqlite3').verbose();

function createTable() {
    const createSQL = "CREATE TABLE IF NOT EXISTS TRANSACTIONS(TRANSACTIONID INTEGER PRIMARY KEY, USERNAME STRING NOT NULL, RECIPIENT STRING NOT NULL, AMOUNT STRING NOT NULL, DESCRIPTION STRING NOT NULL, CATEGORY STRING, EXPENSEDATE STRING NOT NULL, REOCCURING BOOLEAN);"
    db.run(createSQL);
}

let db = new sqlite3.Database('./data.db',
    (err) => {
        if (err) {
            console.log(err);
        }
        createTable()
        console.log("Transactions page is connecting to database");
    });


    
// Executes SQL to insert into DP
async function createTransaction(userName, amount, description, category, expenseDate, reoccuring, recipient, res){
    // console.log("in create");
    createTable()
    // console.log(userName, amount, description, category, expenseDate, reoccuring, recipient, res);
    await db.run("INSERT INTO TRANSACTIONS (USERNAME, RECIPIENT, AMOUNT, DESCRIPTION, CATEGORY, EXPENSEDATE, REOCCURING) VALUES (?,?,?,?,?,?,?);", userName, recipient, amount, description, category, expenseDate, reoccuring, function (err) {
        if (err) {
            res.send("Transaction Creation failed: " + err);
            return ;
        }
        else{
            res.send("Transaction Successfully Created!!");
        }
    })
    console.log("Transaction Created!");
}

// Executes SQL to delete/insert into DP
async function changeTransaction(transactionID, userName, amount, description, category, expenseDate, reoccuring, recipient, res){

    console.log(userName);

    // delete old row
    await db.run("DELETE FROM TRANSACTIONS WHERE TRANSACTIONID = ?;", transactionID, function (err) {
        if (err) {
            res.send("Transaction Edit failed: " + err);
            return;
        }
    })


    // insert new row
    await db.run("INSERT INTO TRANSACTIONS (USERNAME, RECIPIENT, AMOUNT, DESCRIPTION, CATEGORY, EXPENSEDATE, REOCCURING) VALUES (?,?,?,?,?,?,?);", userName, recipient, amount, description, category, expenseDate, reoccuring, function (err) {
        if (err) {
            res.send("Transaction Creation failed: " + err);
            return ;
        }
        res.send("Old transaction was replaced with these new values");
    })
    console.log("Transaction Created!");
}


//delete this primary key
async function deleteTransaction(transactionID, res) {
    await db.run("DELETE FROM TRANSACTIONS WHERE TRANSACTIONID = ?;", transactionID, function (err) {
        // await db.run("DROP TABLE TRANSACTIONS;", function (err) {
        if (err) {
            res.send("Transaction Deletion failed: " + err);
            return;
        }
            res.send("Previous data deleted!!");
    })

    console.log("Transaction Deleted!");
}




//Gets transaction, see routes
async function getTransactions(userName, res) {
    let sql = "SELECT TRANSACTIONID, USERNAME, RECIPIENT, AMOUNT, DESCRIPTION, CATEGORY, EXPENSEDATE, REOCCURING FROM TRANSACTIONS WHERE USERNAME = '?'".replace("?", userName);
    await db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        var json =  '{ "transactions" : ['
        var first = 1
        rows.forEach((row) => {
            if(first == 0){
                json += ','
            }
            first = 0;            
            var jsonItem = '{ "TRANSACTIONID":"' +row.TRANSACTIONID +'" , "USERNAME":"' +row.USERNAME +'" , "RECIPIENT":"' +row.RECIPIENT +'" , "AMOUNT":"' +row.AMOUNT +'" , "DESCRIPTION":"' +row.DESCRIPTION +'" , "CATEGORY":"' +row.CATEGORY +'" , "EXPENSEDATE":"' +row.EXPENSEDATE +'" , "REOCCURING":"' +row.REOCCURING +'"}'//.replace("?", row.TRANSACTIONID, row.USERNAME, row.RECIPIENT, row.AMOUNT, row.DESCRIPTION, row.CATEGORY, row.EXPENSEDATE, row.REOCCURING)
            json += jsonItem
        });
        json += ']}'

        var response = JSON.parse(json);
        //printing a pretty version of the json to consol
        console.log(JSON.stringify(response, null, 2))
        res.json(response)
    });
}



