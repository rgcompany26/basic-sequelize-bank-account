module.exports = {
	debug: (...input) => {
		if (process.env.LOGS) {
			console.log(input)
		}
	}
}