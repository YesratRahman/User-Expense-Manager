var express = require('express');
var router = express.Router();
var incomeService = require('../controller/income');

router.get('/', function(req, res, next) {
    res.send("Hello, I'm the incomes page!")
});


// Create income
//      Saves a income to the DB using the values within req
// REQUEST:
//      request contains a JSON with the field "USERNAME": "chris0piper" ..... and all other income actributes
// RESPONCE:
//       N/A, use Get to see the list of incomes
router.post('/create', (req, res, next) =>
    {
        //TODO Need to talk skip to Abhishek S about how to act as an 
        //authorized user while testing

        // userService.isAuthenticated(req, res, function () {
                incomeService.newIncome(req, res, next);
            //}
        //);
    });

// Edit income
//      Changes an existing income to the values within in req
//      this is where the incomeId UUID comes in handy.
// REQUEST:
//      request contains a JSON with the field "INCOMEID": 1, "USERNAME": "chris0piper" ..... and all other income actributes
// RESPONCE:
//       N/A, use Get to see the list of incomes
router.post('/edit', (req, res, next) =>
{
    //userService.isAuthenticated(req, res, function () {
            incomeService.editIncome(req, res, next);
      //  }
    //);
});



// Delete income
//      deletes the income with the gived ID
// REQUEST:
//      request contains a JSON with the field "INCOMEID": 1
// RESPONCE:
//      N/A
router.post('/delete', (req, res, next) =>
    {
        //userService.isAuthenticated(req, res, function () {
            incomeService.removeIncome(req, res, next);
            //}
        //);
    });
module.exports = router;


// Get incomes
//      Returns all incomes for a given user
// REQUEST:
//      request contains a JSON with the field "USERNAME": "John Doe"
// RESPONCE:
//      a JSON containing an array of JSON's of all incomes for this user
//      This JSON array is of the following structure
router.post('/get', (req, res, next) =>
    {
        //userService.isAuthenticated(req, res, function () {
            incomeService.requestIncome(req, res, next);
            //}
        //);
    });
module.exports = router;

// EXAMPLE /GET RESPONSE JSON
// {
//     "incomes": [
//       {
//         "incomeID": "2",
//         "USERNAME": "hi",
//         "RECIPIENT": "12",
//         "AMOUNT": "33",
//         "DESCRIPTION": "okey",
//         "CATEGORY": "me time",
//         "EXPENSEDATE": "6/8/2020",
//         "REOCCURING": "0"
//       },
//       {
//         "incomeID": "3",
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


