
const transactionService = require('../services/transaction')

module.exports = {
    newTransaction,
    editTransaction,
    removeTransaction,
    requestTransaction
};

function newTransaction(req, res, next) {

    //Test Values
    const userID = req.body["userName"]
    const recipient = req.body["recipient"]
    const amount = req.body["amount"]
    const description = req.body["description"]
    const category = req.body["category"]
    const expenseDate = req.body["expenseDate"]
    const reoccuring = req.body["reoccuring"]

    transactionService.createTransaction(userID, amount, description, category, expenseDate, reoccuring, recipient, res);

}

function editTransaction(req, res, next) {


    console.log(req.body);

    //Test Values
    const transactionID = req.body["TRANSACTIONID"]
    const userID = req.body["userName"]
    const recipient = req.body["recipient"]
    const amount = req.body["amount"]
    const description = req.body["description"]
    const category = req.body["category"]
    const expenseDate = req.body["expenseDate"]
    const reoccuring = req.body["reoccuring"]

    
    transactionService.changeTransaction(transactionID, userID, amount, description, category, expenseDate, reoccuring, recipient, res);
}


function removeTransaction(req, res, next) {

    //ID of the old transaction
    const transactionID = req.body["TRANSACTIONID"]
    
    transactionService.deleteTransaction(transactionID, res);
}


function requestTransaction(req, res, next) {

    //ID of the old transaction
    const userName  = req.body["userName"];
    
    transactionService.getTransactions(userName, res);
}

