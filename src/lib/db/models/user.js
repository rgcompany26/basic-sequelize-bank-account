const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: "user_id_key"
		},
		username: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
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
		user_role_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'user_role',
				key: 'id'
			}
		}
	}, {
		sequelize,
		tableName: 'user',
		schema: 'public',
		hasTrigger: true,
		timestamps: false,
		indexes: [
			{
				name: "user_id_key",
				unique: true,
				fields: [
					{name: "id"},
				]
			},
			{
				name: "user_pkey",
				unique: true,
				fields: [
					{name: "username"},
				]
			},
		]
	});
};
