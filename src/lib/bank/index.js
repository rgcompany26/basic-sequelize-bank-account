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

const createUser = async () => {
    checkDB()
    const user = await db['user'].create({
        user_role: constants.user.types.CLIENT
    })
    return user.toJSON()
}


const createBarber = async () => {
    checkDB()
    const user = await db['user'].create({
        user_role: constants.user.types.BARBERSHOP_REPRESENTATIVE
    })
    const account = await db['account'].create({
        user_id: user.id,
        account_type_id: constants.account.types.BUSINESS,
        balance: 0
    })
    return {
        barbershop: user.toJSON(),
        account: account.toJSON()
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

const makeDeposit = async ({accountId, amount}) => {
    checkDB()
    const account = await db['account'].findByPk(accountId)
    if (!account) {
        errorAccountNotFound()
    }
    await account.update({
        balance: parseFloat(account['balance']) + Math.abs(amount)
    })
    return account.toJSON()
}

const makeWithdrawal = async ({accountId, amount}) => {
    checkDB()
    const account = await db['account'].findByPk(accountId)
    if (!account) {
        errorAccountNotFound()
    }
    await account.update({
        balance: parseFloat(account['balance']) - Math.abs(amount)
    })
    return account.toJSON()
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

module.exports = {
    setDB,
    createUser,
    createBarber,
    createPersonalAccount,
    makeDeposit,
    makeWithdrawal,
    makeTransfer,
    getAccount
}