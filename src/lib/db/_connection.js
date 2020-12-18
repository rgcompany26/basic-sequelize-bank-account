const fs = require('fs')
const path = require('path')

const DIR = path.join(__dirname+'/models')

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_PORT
} = process.env

const init = async () => {
    console.log('MODELS DIR', DIR)
    const {Sequelize, DataTypes} = require('sequelize')
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    })
    try {
        const db = {};

        await sequelize.authenticate()
        console.log('Connection has been established successfully.')

        fs
            .readdirSync(DIR)
            .filter((file) => {
                const returnFile = (file.indexOf('.') !== 0)
                    && (file.slice(-3) === '.js');
                return returnFile;
            })
            .forEach((file) => {
                const model = require(path.join(DIR, file))(sequelize, DataTypes)
                if (model.name) {
                    db[model.name] = model;
                }
            });

        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        return db
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit(0)
    }
}

module.exports = {
    init
}