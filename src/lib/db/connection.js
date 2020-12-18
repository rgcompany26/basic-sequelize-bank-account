const {Sequelize, DataTypes} = require('sequelize')

const _account = require("./models/account");
const _account_type = require("./models/account_type");
const _log_on_transaction = require("./models/log_on_transaction");
const _transaction = require("./models/transaction");
const _transaction_type = require("./models/transaction_type");
const _user = require("./models/user");
const _user_role = require("./models/user_role");

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_PORT
} = process.env

const init = async () => {
    console.log('DB Credentials', {
        DB_HOST,
        DB_NAME,
        DB_USER,
        DB_PASS,
        DB_PORT
    })
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            },
            // https://github.com/sequelize/sequelize/issues/8019
            decimalNumbers: true
        }
    })
    try {

        await sequelize.authenticate()
        console.log('Connection has been established successfully.')

        const account = _account(sequelize, DataTypes);
        const account_type = _account_type(sequelize, DataTypes);
        const log_on_transaction = _log_on_transaction(sequelize, DataTypes);
        const transaction = _transaction(sequelize, DataTypes);
        const transaction_type = _transaction_type(sequelize, DataTypes);
        const user = _user(sequelize, DataTypes);
        const user_role = _user_role(sequelize, DataTypes);

        account.belongsTo(account_type, {foreignKey: "account_type_id"});
        account_type.hasMany(account, {foreignKey: "account_type_id"});
        account.belongsTo(user, {foreignKey: "user_id"});
        user.hasMany(account, {foreignKey: "user_id"});
        log_on_transaction.belongsTo(transaction, {foreignKey: "transaction_id"});
        transaction.hasMany(log_on_transaction, {foreignKey: "transaction_id"});
        transaction.belongsTo(transaction_type, {foreignKey: "type_id"});
        transaction_type.hasMany(transaction, {foreignKey: "type_id"});
        user.belongsTo(user_role, {foreignKey: "user_role_id"});
        user_role.hasMany(user, {foreignKey: "user_role_id"});

        return {
            account,
            account_type,
            log_on_transaction,
            transaction,
            transaction_type,
            user,
            user_role,
        };

    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit(0)
    }
}

module.exports = {
    init
}