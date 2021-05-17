const moment = require('moment')
const Screens = {}

/** Get all paths, filenames and dirs */
Screens.get_paths = (date_unix, file_name) => {
	const year = moment.unix(date_unix).format('YYYY')
	const month = moment.unix(date_unix).format('MM')
	const file_name_thumb = Screens.get_thumb_file_name(file_name)

	return {
		screen: {
			file_name: file_name,
			path: `screens/${year}/${month}/${file_name}`
		},
		thumb: {
			file_name: file_name_thumb,
			path: `screens/${year}/${month}/${file_name_thumb}`
		}
	}
}

/** Turns "ow_2021-05-09_17.28.18.webp" into "ow_2021-05-09_17.28.18_thumbnail.webp" */
Screens.get_thumb_file_name = (file_name) => {
	// file_name example: "ow_2021-05-09_17.28.18.webp"
	regex = /([\w\-\.]+)(?=\.webp)/ // matches "ow_2021-05-09_17.28.18"
	const short_string = file_name.match(regex)[0]

	return short_string + '_thumbnail.webp'
}

// TODO get moar paths/dirs
// TODO get time variables
// TODO get game variables

module.exports = Screens