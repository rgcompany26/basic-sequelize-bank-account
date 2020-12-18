const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('transaction', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'transaction_type',
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
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'transaction',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "transaction_pkey",
				unique: true,
				fields: [
					{name: "id"},
				]
			},
		]
	});
};
