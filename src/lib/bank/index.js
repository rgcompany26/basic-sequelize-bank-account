const constants = require('./constants')

let db

const checkDB = () => {
    if (!db) {
        throw new Error('Invalid DB')
    }
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
        account_type_id: constants.account.types.BUSINESS
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
        account_type_id: constants.account.types.PERSONAL
    })
    return account.toJSON()
}

module.exports = {
    setDB,
    createUser,
    createBarber,
    createPersonalAccount
}