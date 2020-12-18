const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('log_on_transaction', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		transaction_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'transaction',
				key: 'id'
			}
		},
		amount: {
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
		},
		ticket: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		account_number: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		transaction_type: {
			type: DataTypes.INTEGER,
			allowNull: true
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
