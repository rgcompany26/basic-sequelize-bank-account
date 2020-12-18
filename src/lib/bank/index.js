const cuid = require('cuid')
const moment =  require('moment')

const constants = require('./constants')

let db

const checkDB = () => {
	if (!db) {
		throw new Error('Invalid DB.')
	}
}

const errorAccountNotFound = () => {
	throw new Error('Account not found.')
}

const setDB = (input) => {
	db = input
}

const createTransaction = async ({
														 ticket,
														 accountNumber,
														 transactionType,
														 amount
													 }) => {
	const transaction = await db['transaction'].create({
		type_id: transactionType,
		amount,
		ticket
	})
	const transactionLog = await db['log_on_transaction'].create({
		ticket,
		account_number: accountNumber,
		transaction_id: transaction.id,
		transaction_type: transactionType,
		amount
	})
	return {
		transaction: transaction.toJSON(),
		log: transactionLog.toJSON()
	}
}

const createUser = async () => {
	checkDB()
	const user = await db['user'].create({
		user_role: constants.user.types.CLIENT
	})
	return user.toJSON()
}


const setupBarberShop = async () => {
	checkDB()
	const userBarberShop = await db['user'].create({
		user_role: constants.user.types.BARBERSHOP_REPRESENTATIVE
	})
	const accountBarberShop = await db['account'].create({
		user_id: userBarberShop.id,
		account_type_id: constants.account.types.BUSINESS,
		balance: 0
	})
	const userBarber = await db['user'].create({
		user_role: constants.user.types.BARBER
	})
	const accountBarber = await db['account'].create({
		user_id: userBarber.id,
		account_type_id: constants.account.types.BARBER,
		balance: 0
	})
	return {
		barbershopUser: userBarberShop.toJSON(),
		barbershopAccount: accountBarberShop.toJSON(),
		barberUser: userBarber.toJSON(),
		barberAccount: accountBarber.toJSON()
	}
}

const createPersonalAccount = async ({userId}) => {
	checkDB()
	const account = await db['account'].create({
		user_id: userId,
		account_type_id: constants.account.types.PERSONAL,
		balance: 0
	})
	return account.toJSON()
}

const makeDeposit = async ({accountId, amount, ticket = cuid()}) => {
	checkDB()
	const account = await db['account'].findByPk(accountId)
	if (!account) {
		errorAccountNotFound()
	}
	await account.update({
		balance: parseFloat(account['balance']) + Math.abs(amount)
	})
	const movement =  await createTransaction({
		ticket,
		accountNumber: account.id,
		transactionType: constants.transaction.types.DEPOSIT,
		amount
	})
	return movement
}

const makeWithdrawal = async ({accountId, amount, ticket = cuid(), type}) => {
	checkDB()
	const account = await db['account'].findByPk(accountId)
	if (!account) {
		errorAccountNotFound()
	}
	await account.update({
		balance: parseFloat(account['balance']) - Math.abs(amount)
	})
	const movement =  await createTransaction({
		ticket,
		accountNumber: account.id,
		transactionType: type || constants.transaction.types.WITHDRAWAL,
		amount
	})
	return movement
}

const makeHaircut = async ({
														 customerAccountId,
														 barberShopAccountId,
														 barberAccountId,
														 cost,
														 tip
													 }) => {
	const ticket = cuid()
	const totalAmount = Math.abs(cost) + Math.abs(tip)
	await makeWithdrawal({accountId: customerAccountId, amount: totalAmount, ticket, type:
		constants.transaction.types.BARBER_SERVICE_PAYMENT})
	await makeDeposit({accountId: barberShopAccountId, amount: Math.abs(cost), ticket})
	await makeDeposit({accountId: barberAccountId, amount: Math.abs(tip), ticket})
	return {
		ticket,
		paid: totalAmount
	}
}

const makeRefund = async ({
														ticket
													 }) => {
	await makeWithdrawal({accountId: customerAccountId, amount: totalAmount, ticket})
	await makeWithdrawal({accountId: customerAccountId, amount: totalAmount, ticket})
	await makeDeposit({accountId: barberAccountId, amount: Math.abs(tip), ticket})
	return {
		ticket,
		refunded: totalAmount
	}
}

const makeTransfer = async ({originAccountId, destinationAccountId, amount}) => {
	await makeWithdrawal({accountId: originAccountId, amount})
	await makeDeposit({accountId: destinationAccountId, amount})
}

const getAccount = async ({accountId}) => {
	checkDB()
	const account = await db['account'].findByPk(accountId)
	if (!account) {
		errorAccountNotFound()
	}
	return account.toJSON()
}

const getAccountHistory = async ({accountId}) => {
	checkDB()
	let history = await db['log_on_transaction'].findAll({
		where: {
			account_number: accountId
		},
		order: [
			['id', 'DESC']
		],
		raw: true,
		nest: true
	})
	history = history.map((movement) => {
		return {
			ticket: movement.ticket,
			date: moment(movement['created_at']).format('LLLL'), // Monday, June 9 2014 9:32 PM
			amount: movement.amount,
			type: constants.parse.transactionType(movement['transaction_type'])
		}
	})
	return history
}

module.exports = {
	setDB,
	createUser,
	setupBarberShop,
	createPersonalAccount,
	makeDeposit,
	makeWithdrawal,
	makeTransfer,
	makeHaircut,
	getAccount,
	getAccountHistory
}