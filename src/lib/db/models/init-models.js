var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _account_type = require("./account_type");
var _log_on_transaction = require("./log_on_transaction");
var _transaction = require("./transaction");
var _transaction_type = require("./transaction_type");
var _user = require("./user");
var _user_role = require("./user_role");

function initModels(sequelize) {
	var account = _account(sequelize, DataTypes);
	var account_type = _account_type(sequelize, DataTypes);
	var log_on_transaction = _log_on_transaction(sequelize, DataTypes);
	var transaction = _transaction(sequelize, DataTypes);
	var transaction_type = _transaction_type(sequelize, DataTypes);
	var user = _user(sequelize, DataTypes);
	var user_role = _user_role(sequelize, DataTypes);

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
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
