module.exports = {
	getMenu: (req, res) => {
		const menu = {
			'foo': 'bar',
			'fruit': 'banana'
		}
		return res.status(200).json({menu: menu})
	}
}