const { response } = require('express');

module.exports = {
    createIncome,
    changeIncome,
    deleteIncome,
    getIncomes
};

const sqlite3 = require('sqlite3').verbose();

function createTable() {
    const createSQL = "CREATE TABLE IF NOT EXISTS INCOMES(INCOMEID INTEGER PRIMARY KEY, USERNAME STRING NOT NULL, RECIPIENT STRING NOT NULL, AMOUNT STRING NOT NULL, DESCRIPTION STRING NOT NULL, CATEGORY STRING, EXPENSEDATE STRING NOT NULL, REOCCURING BOOLEAN);"
    db.run(createSQL);
}

let db = new sqlite3.Database('./data.db',
    (err) => {
        if (err) {
            console.log(err);
        }
        createTable()
        console.log("Incomes page is connecting to database");
    });


    
// Executes SQL to insert into DP
async function createIncome(userName, amount, description, category, expenseDate, reoccuring, recipient, res){

    createTable()

    await db.run("INSERT INTO INCOMES (USERNAME, RECIPIENT, AMOUNT, DESCRIPTION, CATEGORY, EXPENSEDATE, REOCCURING) VALUES (?,?,?,?,?,?,?);", userName, recipient, amount, description, category, expenseDate, reoccuring, function (err) {
        if (err) {
            res.send("Income Creation failed: " + err);
            return ;
        }
        else{
            res.send("Income Successfully Created!!");
        }
    })
    console.log("Income Created!");
}

// Executes SQL to delete/insert into DP
async function changeIncome(incomeID, userName, amount, description, category, expenseDate, reoccuring, recipient, res){
    // delete old row
    await db.run("DELETE FROM INCOMES WHERE INCOMEID = ?;", incomeID, function (err) {
        if (err) {
            res.send("Income Edit failed: " + err);
            return;
        }
    })

    // insert new row
    await db.run("INSERT INTO INCOMES (USERNAME, RECIPIENT, AMOUNT, DESCRIPTION, CATEGORY, EXPENSEDATE, REOCCURING) VALUES (?,?,?,?,?,?,?);", userName, recipient, amount, description, category, expenseDate, reoccuring, function (err) {
        if (err) {
            res.send("Income Creation failed: " + err);
            return ;
        }
        res.send("Old income was replaced with these new values");
    })
    console.log("Income Created!");
}


//delete this primary key
async function deleteIncome(incomeID, res) {
    await db.run("DELETE FROM INCOMES WHERE INCOMEID = ?;", incomeID, function (err) {
        if (err) {
            res.send("Income Deletion failed: " + err);
            return;
        }
            res.send("Previous data deleted!!");
    })

    console.log("Income Deleted!");
}




//Gets income, see routes
async function getIncomes(userName, res) {
    let sql = "SELECT INCOMEID, USERNAME, RECIPIENT, AMOUNT, DESCRIPTION, CATEGORY, EXPENSEDATE, REOCCURING FROM INCOMES WHERE USERNAME = '?'".replace("?", userName);
    await db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        var json =  '{ "incomes" : ['
        var first = 1
        rows.forEach((row) => {
            if(first == 0){
                json += ','
            }
            first = 0;            
            var jsonItem = '{ "INCOMEID":"' +row.INCOMEID +'" , "USERNAME":"' +row.USERNAME +'" , "RECIPIENT":"' +row.RECIPIENT +'" , "AMOUNT":"' +row.AMOUNT +'" , "DESCRIPTION":"' +row.DESCRIPTION +'" , "CATEGORY":"' +row.CATEGORY +'" , "EXPENSEDATE":"' +row.EXPENSEDATE +'" , "REOCCURING":"' +row.REOCCURING +'"}'
            json += jsonItem
        });
        json += ']}'

        var response = JSON.parse(json);
        //printing a pretty version of the json to consol
        console.log(JSON.stringify(response, null, 2))
        res.json(response)
    });
}



