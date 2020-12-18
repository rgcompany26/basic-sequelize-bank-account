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
			INVALID: 0,
			REFUND: 1,
			BARBER_SERVICE_PAYMENT: 2,
			TIP: 3,
			DEPOSIT: 4,
			WITHDRAWAL: 5
		}
	},
	parse: {
		transactionType: (typeNumber) => {
			let code = 'INVALID'
			switch (typeNumber) {
				case 1: {
					code = 'REFUND'
					break
				}
				case 2: {
					code = 'BARBER_SERVICE_PAYMENT'
					break
				}
				case 3: {
					code = 'TIP'
					break
				}
				case 4: {
					code = 'DEPOSIT'
					break
				}
				case 5: {
					code = 'WITHDRAWAL'
				}
			}
			return code
		}
	}
}