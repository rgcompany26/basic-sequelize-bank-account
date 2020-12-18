const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('log_on_transaction', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.UUID,
            allowNull: false
        },
        account_number: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transaction',
                key: 'id'
            }
        },
        transaction_type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        value: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now')
        }
    }, {
        sequelize,
        tableName: 'log_on_transaction',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
            {
                name: "log_on_transaction_pkey",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};
