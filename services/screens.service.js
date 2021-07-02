const moment = require('moment')
const config = require('../config')

const Screens = {}

/** Add variables and reorganize screenshot from db */
Screens.process = (row) => {
	const data = { // return object
		id: row.id,
		ico_nrb: row.ico_nrb,
		description: row.description
	}

	// get screen and thumb urls and filenames
	screens_and_thumb = Screens.getScreenAndThumb(row.id, row.file_name)
	data.screen = screens_and_thumb.screen
	data.thumb = screens_and_thumb.thumb

	// get dates and times
	data.date_time = Screens.getDateTime(row.id, row.date_time)

	// game data
	data.game = Screens.getGame(row.game_name, row.game_code, row.ico_nbr)

	return data
}

/** Get url and filename for screen and thumbnail */
Screens.getScreenAndThumb = (date_unix, file_name) => {
	const year = moment.unix(date_unix).format('YYYY')
	const month = moment.unix(date_unix).format('MM')
	const file_name_thumb = Screens.getThumbFileName(file_name)

	return {
		screen: {
			file_name: file_name,
			url: `${config.static_url}screens/${year}/${month}/${file_name}`
		},
		thumb: {
			file_name: file_name_thumb,
			url: `${config.static_url}screens/${year}/${month}/${file_name_thumb}`
		}
	}
}

/** Turns "ow_2021-05-09_17.28.18.webp" into "ow_2021-05-09_17.28.18_thumbnail.webp" */
Screens.getThumbFileName = (file_name) => {
	// file_name example: "ow_2021-05-09_17.28.18.webp"
	regex = /([\w\-\.]+)(?=\.webp)/ // matches "ow_2021-05-09_17.28.18"
	const short_string = file_name.match(regex)[0]

	return short_string + '_thumbnail.webp'
}

/**
 * Get useful dates and times.
 * @param {int} timestamp Unix timestamp (the screens id)
 */
Screens.getDateTime = (timestamp) => {
	const data = {}
	
	data.year = moment.unix(timestamp).format('YYYY')
	data.month = moment.unix(timestamp).format('MM')
	data.day = moment.unix(timestamp).format('DD')
	data.hour = moment.unix(timestamp).format('HH')
	data.minute = moment.unix(timestamp).format('mm')
	data.second = moment.unix(timestamp).format('ss')

	data.weekday = moment.unix(timestamp).format('dddd')
	data.weekday_short = moment.unix(timestamp).format('ddd')

	data.format_date = moment.unix(timestamp).format('YYYY-MM-DD')
	data.format_time = moment.unix(timestamp).format('HH:mm:ss')
	data.format_time_short = moment.unix(timestamp).format('HH:mm')
	data.format_long = `${data.format_date} ${data.format_time}` 

	return data
}

Screens.getGame = (game_name, game_code, ico_nbr) => {

	return {
		code: game_code,
		name: game_name,
		icon16_nbr: ico_nbr,
		icon48_url: `${config.static_url}screens/icons/48/${game_code}.webp`
	}
}

module.exports = Screens

// TODO get game variables