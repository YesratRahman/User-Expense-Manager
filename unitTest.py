import requests 
import time
import jwt
import json 
import sqlite3



class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
    def toJson(self):
        return json.dumps(self.__dict__)

baseUrl = 'http://127.0.0.1:4000'
jwtKey = "fooBar"

def get(url):
    # print(url)
    return requests.get(url)

def post(url, json):
    # print(url)
    # print(json)
    return requests.post(url, data = json)

def unitTest(name, result, expected, expectedStatusCode):
    if hasattr(result, 'status_code') and result.status_code != expectedStatusCode and result.text == expected:
        print(f"[Fail ] {name} Expected a status code of {expectedStatusCode} but instead received {result.status_code} ")
        return False    
    elif result == expected:
        print(f"[Pass ] {name}")
        return True
    elif str(result).startswith(expected):
        print(f"[Pass ] {name}")
        return True 
    elif result.text == expected:
        print(f"[Pass ] {name}")
        return True
    elif str(result.text).startswith(expected):
        print(f"[Pass ] {name}")
        return True 
    else:
        print(f"[Fail] {name}")
        print(f'\tExpected {expected} but instead received {result.text}')
        return False
        
def TestField(name, given ,expected):
    if given == expected:
        print(f"[Pass ] {name}")
        return True
    elif given in expected:
        print(f"[Pass ] {name}")
        return True 

    print(f"[Fail] {name}")
    print(f'\tExpected {True} but instead received {False}')
    return Falsev

def lambdaUnitTest(name, function):
    result = function
    if result:
        print(f"[Pass ] {name}")
        return True
        
    print(f"[Fail] {name}")
    print(f'\tExpected {True} but instead received {False}')
    return False

def TestField(name, given ,expected):
    if given == expected:
        print(f"[Pass ] {name}")
        return True
    # elif given in expected:
    #     print(f"[Pass ] {name}")
    #     return True 
        
    print(f"[Fail] {name}")
    print(f'\tExpected {True} but instead received {False}')
    return False
    
def notEqual(a, b):
    return a != b

def tests():
    start = time.time()

    register = {
        'UserName': 'test'+ str(start),
        'Password': '123123',
        'FirstName': 'Ab',
        'LastName': 'S',
        'Email':'abs@vt.edu'
    }

    unitTest('User registration', post(baseUrl + '/users/register', register), 'Registration success', 200)



    unitTest('User registration Duplicate Username', post(baseUrl + '/users/register', register), 'Registration failed', 200)
    
    jwtToken = post(baseUrl + '/users/authenticate', register)
    decoded = jwt.decode(jwtToken.text, jwtKey, algorithms='HS256')
    user = User('xyz', '123123')
    userName = decoded.get('username')
    unitTest('User Authentication', register.get('UserName') ,userName , 200)
    
    # post(baseUrl + '/users/authenticate', userName)
    # user.toJson())
    # print(user.toJson())
    # lambdaUnitTest('User Authentication with unauthorized token',notEqual(register.get('UserName'), userName) )
    # unitTest('User Authentication with unauthorized token', register.get('UserName') , decoded.get('username'), 200)
    # transactionService.createTransaction(transactionID, userID, amount, description, category, expenseDate, reoccuring, res);


    # const transactionID = 12;//req.body["UserName"]
    userID = "PiperChris"
    amount = "123"
    description = "very nice"
    category = "personal"
    expenseDate = "6/10/2020"
    reoccuring = True
    
    # unitTest('User registration Duplicate Username', post(baseUrl + '/users/register', register), 'Registration failed', 200)

    transaction = {'UserName': userID , 'Amount': amount, "Description": description, "Category" : category, "ExpenseDate" : expenseDate, "Reoccuring": reoccuring}
    # unitTest('Create Transaction',  post(baseUrl + '/users/transaction/create', transaction) , "Transaction Successfully Created!!", 200)

    # const userID = req.body["userName"]
    # const recipient = req.body["recipient"]
    # const amount = req.body["amount"]
    # const description = req.body["description"]
    # const category = req.body["category"]
    # const expenseDate = req.body["expenseDate"]
    # const reoccuring = req.body["reoccuring"]

    # unitTest('Delete Transaction',  post(baseUrl + '/users/transaction/create', transaction) , "Transaction Deleted!", 200)

    conn = sqlite3.connect('node/data.db')
    cursor = conn.execute("SELECT email FROM USERS")
    rows = cursor.fetchall()
    TestField("Verify Email Test", *rows[1], "abs@vt.edu")
    cursor = conn.execute("SELECT firstName FROM USERS")
    rows = cursor.fetchall()
    TestField("Verify Firstname Test", *rows[1], "Ab")

    createTransaction = {
        'userName': 'chrisPiper',
        'recipient': 'you',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }

    unitTest('Create Transaction',  post(baseUrl + '/transaction/create', createTransaction) , "Transaction Successfully Created!!", 200)

  
    unitTest('Duplicate Create Transaction',  post(baseUrl + '/transaction/create', createTransaction) , "Transaction Successfully Created!!", 200)


    deleteTransaction = {
        'TRANSACTIONID': '1',
    }

    unitTest('Delete Transaction',  post(baseUrl + '/transaction/delete', deleteTransaction) , "Previous data deleted!!", 200)

    deleteTransaction = {
        'TRANSACTIONID': '1',
    }

    unitTest('Duplicate Delete Transaction',  post(baseUrl + '/transaction/delete', deleteTransaction) , "Previous data deleted!!", 200)


    editTransaction = {
        'TRANSACTIONID': '3',
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }
    unitTest('Edit Transaction',  post(baseUrl + '/transaction/edit', editTransaction) , "Old transaction was replaced with these new values", 200)
    

    editTransaction = {
        'TRANSACTIONID': '3',
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }
    unitTest('Duplicate Edit Transaction',  post(baseUrl + '/transaction/edit', editTransaction) , "Old transaction was replaced with these new values", 200)

    createIncome = {
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }
    unitTest('Create Income',  post(baseUrl + '/income/create', createIncome) , "Income Successfully Created!!", 200)

    createIncome = {
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }
    unitTest('Duplicate Create Income',  post(baseUrl + '/income/create', createIncome) , "Income Successfully Created!!", 200)

    deleteIncome = {
        'INCOMEID': '1',
    }

    unitTest('Delete Income',  post(baseUrl + '/income/delete', deleteIncome) , "Previous data deleted!!", 200)

    deleteIncome = {
        'INCOMEID': '1',
    }

    unitTest('Duplicate Delete Income',  post(baseUrl + '/income/delete', deleteIncome) , "Previous data deleted!!", 200)

    editIncome = {
        'INCOMEID': '2',
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }

    unitTest('Edit Income',  post(baseUrl + '/income/edit', editIncome) , "Old income was replaced with these new values", 200)
    editIncome = {
        'INCOMEID': '2',
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }
    unitTest('Duplicate Edit Income',  post(baseUrl + '/income/edit', editIncome) , "Old income was replaced with these new values", 200)
    



    unitTest('Duplicate Edit Income',  post(baseUrl + '/income/edit', editIncome) , "Old income was replaced with these new values", 200)


    conn = sqlite3.connect('node/data.db')
    cursor = conn.execute("SELECT firstName FROM USERS")
    rows = cursor.fetchall()

    TestField("Verify Firstname Test", *rows[len(rows) - 1], "Ab")

     
    cursor = conn.execute("SELECT lastName FROM USERS")
    rows = cursor.fetchall()
    TestField("Verify lastName Test", *rows[len(rows) - 1], "S")

     
    cursor = conn.execute("SELECT email FROM USERS")
    rows = cursor.fetchall()
    TestField("Verify email Test", *rows[len(rows) - 1], "abs@vt.edu")


        # 'INCOMEID': '2',
        # 'USERNAME': 'chrisPiper',
        # 'RECIPIENT': 'me',
        # 'AMOUNT': '1,000,000',
        # 'DESCRIPTION': 'have fun',
        # 'CATEGORY':'vegas',
        # 'EXPENSEDATE': 'test'+ str(start),
        # 'REOCCURING': False


    cursor = conn.execute("SELECT * FROM TRANSACTIONS")
    rows = cursor.fetchall()


    cursor = conn.execute("SELECT USERNAME FROM TRANSACTIONS")
    rows = cursor.fetchall()
    TestField("Verify transaction userName Test", *rows[len(rows) - 1], "chrisPiper")

     
    cursor = conn.execute("SELECT RECIPIENT FROM TRANSACTIONS")
    rows = cursor.fetchall()
    TestField("Verify transaction recipient Test", *rows[len(rows) - 1], "me")

     
    cursor = conn.execute("SELECT AMOUNT FROM TRANSACTIONS")
    rows = cursor.fetchall()
    TestField("Verify transaction amount Test", *rows[len(rows) - 1], "1,000,000")

    cursor = conn.execute("SELECT DESCRIPTION FROM TRANSACTIONS")
    rows = cursor.fetchall()
    TestField("Verify transaction DESCRIPTION Test", *rows[len(rows) - 1], "have fun")

    cursor = conn.execute("SELECT CATEGORY FROM TRANSACTIONS")
    rows = cursor.fetchall()
    TestField("Verify transaction CATEGORY Test", *rows[len(rows) - 1], "vegas")

    cursor = conn.execute("SELECT REOCCURING FROM TRANSACTIONS")
    rows = cursor.fetchall()
    TestField("Verify transaction REOCCURING Test", *rows[len(rows) - 1], "False")

    createIncome = {
        'userName': 'chrisPiper',
        'recipient': 'me',
        'amount': '1,000,000',
        'description': 'have fun',
        'category':'vegas',
        'expenseDate': 'test'+ str(start),
        'reoccuring': False
    }
    post(baseUrl + '/income/create', createIncome)


    
    cursor = conn.execute("SELECT * FROM INCOMES")
    rows = cursor.fetchall()

    # print(rows)

    cursor = conn.execute("SELECT USERNAME FROM INCOMES")
    rows = cursor.fetchall()
    TestField("Verify Income userName Test", *rows[len(rows) - 1], "chrisPiper")

     
    cursor = conn.execute("SELECT RECIPIENT FROM INCOMES")
    rows = cursor.fetchall()
    TestField("Verify Income recipient Test", *rows[len(rows) - 1], "me")

     
    cursor = conn.execute("SELECT AMOUNT FROM INCOMES")
    rows = cursor.fetchall()
    # print( *rows[len(rows) - 1])
    TestField("Verify Income amount Test", *rows[len(rows) - 1], '1,000,000')

    cursor = conn.execute("SELECT DESCRIPTION FROM INCOMES")
    rows = cursor.fetchall()
    # print( *rows[len(rows) - 1])
    TestField("Verify Income DESCRIPTION Test", *rows[len(rows) - 1], 'have fun')

    cursor = conn.execute("SELECT CATEGORY FROM INCOMES")
    rows = cursor.fetchall()
    # print( *rows[len(rows) - 1])
    TestField("Verify Income CATEGORY Test", *rows[len(rows) - 1], "vegas")

    # print(rows[len(rows) - 1])


    # print(f"We ran the tests in {time.time() - start} (s).")

tests()