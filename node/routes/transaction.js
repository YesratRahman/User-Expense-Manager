var express = require('express');
var router = express.Router();
var transactionService = require('../controller/transaction');

router.get('/', function(req, res, next) {
    res.send("Hello, I'm the Transactions page!")
});


// Create Transaction
//      Saves a transaction to the DB using the values within req
// REQUEST:
//      request contains a JSON with the field "USERNAME": "chris0piper" ..... and all other transaction actributes
// RESPONCE:
//       N/A, use Get to see the list of Transactions
router.post('/create', (req, res, next) =>
    {
        // console.log(req.body);
        //TODO Need to talk skip to Abhishek S about how to act as an 
        //authorized user while testing

        // userService.isAuthenticated(req, res, function () {
                transactionService.newTransaction(req, res, next);
            //}
        //);
    });

// Edit Transaction
//      Changes an existing transaction to the values within in req
//      this is where the transactionId UUID comes in handy.
// REQUEST:
//      request contains a JSON with the field "TRANSACTIONID": 1, "USERNAME": "chris0piper" ..... and all other transaction actributes
// RESPONCE:
//       N/A, use Get to see the list of Transactions
router.post('/edit', (req, res, next) =>
{
    //userService.isAuthenticated(req, res, function () {
            transactionService.editTransaction(req, res, next);
      //  }
    //);
});



// Delete Transaction
//      deletes the transaction with the gived ID
// REQUEST:
//      request contains a JSON with the field "TRANSACTIONID": 1
// RESPONCE:
//      N/A
router.post('/delete', (req, res, next) =>
    {
        //userService.isAuthenticated(req, res, function () {
            transactionService.removeTransaction(req, res, next);
            //}
        //);
    });
module.exports = router;


// Get Transactions
//      Returns all transactions for a given user
// REQUEST:
//      request contains a JSON with the field "USERNAME": "John Doe"
// RESPONCE:
//      a JSON containing an array of JSON's of all transactions for this user
//      This JSON array is of the following structure
router.get('/get', (req, res, next) =>
    {
        //userService.isAuthenticated(req, res, function () {
            transactionService.requestTransaction(req, res, next);
            //}
        //);
    });
module.exports = router;

// EXAMPLE /GET RESPONSE JSON
// {
//     "transactions": [
//       {
//         "TRANSACTIONID": "2",
//         "USERNAME": "hi",
//         "RECIPIENT": "12",
//         "AMOUNT": "33",
//         "DESCRIPTION": "okey",
//         "CATEGORY": "me time",
//         "EXPENSEDATE": "6/8/2020",
//         "REOCCURING": "0"
//       },
//       {
//         "TRANSACTIONID": "3",
//         "USERNAME": "hi",
//         "RECIPIENT": "12",
//         "AMOUNT": "33",
//         "DESCRIPTION": "okey",
//         "CATEGORY": "me time",
//         "EXPENSEDATE": "6/8/2020",
//         "REOCCURING": "0"
//       }
//     ]
//   }
