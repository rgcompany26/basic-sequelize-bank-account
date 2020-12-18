module.exports = {
	cost: {
		HAIR_CUT: 15
	},
	account: {
		types: {
			BUSINESS: 1,
			PERSONAL: 2,
			BARBER: 3
		}
	},
	user: {
		types: {
			BARBERSHOP_REPRESENTATIVE: 1,
			CLIENT: 2,
			BARBER: 3
		}
	},
	transaction: {
		types: {
			REFUND: 1,
			BARBER_SERVICE_PAYMENT: 2,
			TIP: 3,
			DEPOSIT: 4,
			WITHDRAWAL: 5
		}
	}
}