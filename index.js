require('dotenv').config()

const { debug }= require('./src/lib/utils')
const connection = require('./src/lib/db/connection')
const manager = require('./src/lib/bank')

;(async () => {

    const models = await connection.init()
    debug('models', models)
    manager.setDB(models)

    const barbershopA = await manager.createBarber()
    debug('barbershopA', barbershopA)

    const userA = await manager.createUser()
    debug('userA', userA)
    const { id: accountNumberUserA} = await manager.createPersonalAccount(
        {userId: userA.id}
    )
    debug('accountNumberUserA', accountNumberUserA)
    debug('accountUserA', await manager.getAccount({ accountId : accountNumberUserA}))
    await manager.makeDeposit({accountId : accountNumberUserA, amount: 150})
    debug('accountUserA', await manager.getAccount({ accountId : accountNumberUserA}))

    const userB = await manager.createUser()
    debug('userB', userB)
    const { id: accountNumberUserB} = await manager.createPersonalAccount(
        {userId: userB.id}
    )
    debug('accountNumberUserB', accountNumberUserB)
    debug('accountUserB', await manager.getAccount({ accountId : accountNumberUserB}))
    await manager.makeDeposit({accountId : accountNumberUserB, amount: 500})
    debug('accountUserB', await manager.getAccount({ accountId : accountNumberUserB}))

    await manager.makeTransfer({
        originAccountId: accountNumberUserA,
        destinationAccountId: accountNumberUserB,
        amount: 200
    })

    debug('accountUserA', await manager.getAccount({ accountId : accountNumberUserA}))
    debug('accountUserB', await manager.getAccount({ accountId : accountNumberUserB}))

    process.exit(0)
})()
