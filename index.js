require('dotenv').config()

const connection = require('./src/lib/db/connection')
const manager = require('./src/lib/bank')

;(async () => {
    const models = await connection.init()
    console.log('models', models)
    manager.setDB(models)
    const barbershopA = await manager.createBarber()
    console.log('barbershopA', barbershopA)
    const userA = await manager.createUser()
    console.log('userA', userA)
    const accountA = await manager.createPersonalAccount(
        {userId: userA.id}
    )
    console.log('accountA', accountA)
    process.exit(0)
})()
