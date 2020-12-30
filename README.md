# basic-sequelize-bank-account
Demo for sequelize

```
npm i
node index.js
```

!['DB Diagram'](https://github.com/rgcompany26/basic-sequelize-bank-account/blob/main/images/db.png?v=1)

# Javascript Coding Challenge #

### Task ###

Create a Javascript library with Node.js that will manage virtual bank accounts. The library should support making a deposit to an account, making a withdrawal from an account and transferring money between accounts. Use Postgres database and Sequelize for persistence.

Use Case: Customer pays for a haircut by cash and leaves a tip, haircut money should go to the shop's cash account and the tip should go into the barber's cash account. Barber and shop could see their cash balances. When a customer requests a refund then the balance is taken out from the accounts.

A library should allow:

* Making a deposit to an account
* Making a withdrawal from an account
* Making a transfer between two accounts
* Making a refund of a previous transaction
* Getting the account balance
* Showing a history of transactions for an account


### Important Notes ###
* Spend 24 hours maximum from the moment you specify your start date and time.
* Send an email to Squire engineer before you start
* Send an email to Squire engineer when you are finished
* Support a notion of refunds, refund should reference the original transaction
* Managing barber, customer and shop is out of the scope of this challenge, it is only provided for context, manage accounts on their own


### What we expect from the code challenge ###

* Good software engineering practices are used and the code should be production ready.
* The solution is simple, and not over-engineered.
* 3rd party frameworks or packages are kept at a minimum (except ones noted) - we want to see as much of the code you wrote.

I spend 5 hours with focus.
