const get_fruits = (req, res) => {
	const fruits_list = {
		'fruit 1': 'banana',
		'fruit 2': 'apple'
	}
	return res.status(200).json({fruits: fruits_list})
}

module.exports = get_fruits