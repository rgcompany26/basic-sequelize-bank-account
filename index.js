require('dotenv').config()

const connection = require('./src/lib/db/connection')
const manager = require('./src/lib/bank')

let summary = ``
const depositAmount1 = 600
const depositAmount2 = 1200
const transferAmount1 = 200
const tipAmount1 = 10
const hairCut1Cost = 30

;(async () => {

	const models = await connection.init()
	manager.setDB(models)
	const store = await manager.setupBarberShop()
	summary += `
	Barber Shop account number: ${store.barbershopAccount.id}
	Barber Shop balance: ${store.barbershopAccount.balance}
	Barber account number: ${store.barberAccount.id}
	Barber balance: ${store.barberAccount.balance}
	`

	const userA = await manager.createUser()
	let accountUserA = await manager.createPersonalAccount(
		{userId: userA.id}
	)
	summary += `
	***
	User A account number: ${accountUserA.id}
	User A balance: ${accountUserA.balance}
	`
	await manager.makeDeposit({accountId: accountUserA.id, amount: depositAmount1})

	accountUserA = await manager.getAccount({accountId: accountUserA.id})

	summary += `
	***
	User A deposit: ${depositAmount1}
	User A balance: ${accountUserA.balance}
	`

	const userB = await manager.createUser()
	let accountUserB = await manager.createPersonalAccount(
		{userId: userB.id}
	)
	summary += `
	***
	User B account number: ${accountUserA.id}
	User B balance: ${accountUserB.balance}
	`
	await manager.makeDeposit({accountId: accountUserB.id, amount: depositAmount2})

	accountUserB = await manager.getAccount({accountId: accountUserB.id})

	summary += `
	***
	User B deposit: ${depositAmount2}
	User B balance: ${accountUserB.balance}
	`

	await manager.makeTransfer({
		originAccountId: accountUserA.id,
		destinationAccountId: accountUserB.id,
		amount: transferAmount1
	})

	accountUserA = await manager.getAccount({accountId: accountUserA.id})
	accountUserB = await manager.getAccount({accountId: accountUserB.id})

	summary += `
	***
	TRANSFER ${transferAmount1} from User A to User B
	User A account number: ${accountUserA.id}
	User A balance: ${accountUserA.balance}
	User B account number: ${accountUserB.id}
	User B balance: ${accountUserB.balance}
	`

	const transaction = await manager.makeHaircut({
		customerAccountId: accountUserB.id,
		barberShopAccountId: store.barbershopAccount.id,
		barberAccountId: store.barberAccount.id,
		tip: tipAmount1,
		cost: hairCut1Cost
	})

	accountUserB = await manager.getAccount({accountId: accountUserB.id})

	summary += `
	***
	User B MAKE a hair cut with ${hairCut1Cost} and tip ${tipAmount1}
	User B balance: ${accountUserB.balance}
	`

	summary += `
	***
	TRANSACTION BILL
	Ticket: ${transaction.ticket}
	Paid: ${transaction.paid}
	Account number: ${accountUserB.id}
	`

	let accountBarberShop = await manager.getAccount({accountId: store.barbershopAccount.id})
	let accountBarber = await manager.getAccount({accountId: store.barberAccount.id})

	summary += `
	***
	Barber Shop account number: ${accountBarberShop.id}
	Barber Shop balance: ${accountBarberShop.balance}
	Barber account number: ${accountBarber.id}
	Barber balance: ${accountBarber.balance}
	`

	let refund = await manager.makeRefund({
		ticket: transaction.ticket,
		destinationAccountId: accountUserB.id
	})

	summary += `
	***
	REFUND
	${JSON.stringify(refund, null, 2)}
	`

	history = await manager.getAccountHistory({
		accountId: accountUserB.id
	})

	summary += `
$$$$$$$$$$$$$$$$$$$$$$$
HISTORY
${JSON.stringify(history, null, 2)}
`

	accountUserB = await manager.getAccount({accountId: accountUserB.id})

	summary += `
	***
	User B account number: ${accountUserA.id}
	User B balance: ${accountUserB.balance}
	`

	console.log('---SUMMARY---')
	console.log(summary)
	console.log('---SUMMARY:END---')

	process.exit(0)
})()
