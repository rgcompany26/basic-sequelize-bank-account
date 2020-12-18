const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('account', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        account_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'account_type',
                key: 'id'
            }
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
        },
        balance: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'account',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
            {
                name: "account_pkey",
                unique: true,
                fields: [
                    {name: "id"},
                ]
            },
        ]
    });
};
