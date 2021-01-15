
const incomeService = require('../services/income')
const transactionService = require('../services/transaction');

module.exports = {
    newIncome,
    editIncome,
    removeIncome,
    requestIncome
};

function newIncome(req, res, next) {

    //Test Values

    const userID = req.body["userName"]
    const recipient = req.body["recipient"]
    const amount = req.body["amount"]
    const description = req.body["description"]
    const category = req.body["category"]
    const expenseDate = req.body["expenseDate"]
    const reoccuring = req.body["reoccuring"]

    incomeService.createIncome(userID, amount, description, category, expenseDate, reoccuring, recipient, res);

}

function editIncome(req, res, next) {


    //Test Values
    const incomeID = req.body["INCOMEID"]
    const userID = req.body["userName"]
    const recipient = req.body["recipient"]
    const amount = req.body["amount"]
    const description = req.body["description"]
    const category = req.body["category"]
    const expenseDate = req.body["expenseDate"]
    const reoccuring = req.body["reoccuring"]

    
    incomeService.changeIncome(incomeID, userID, amount, description, category, expenseDate, reoccuring, recipient, res);
}


function removeIncome(req, res, next) {

    //ID of the old income
    const incomeID = 1;//req.body["INCOMEID"]
    
    incomeService.deleteIncome(incomeID, res);
}


function requestIncome(req, res, next) {

    //ID of the old income
    const userName = "hi";//req.body["USERNAME"]
    
    incomeService.getIncomes(userName, res);
}
