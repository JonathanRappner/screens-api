const format = require('date-fns/format')
const fromUnixTime = require('date-fns/fromUnixTime')
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

	// resolution
	data.resolution = {width: row.width, height: row.height}

	// game data
	data.game = Screens.getGame(row.game_name, row.game_code, row.icon16)

	return data
}

/** Get url and filename for screen and thumbnail */
Screens.getScreenAndThumb = (timestamp, file_name) => {
	const date = fromUnixTime(timestamp)
	const year = format(date, 'yyyy')
	const month = format(date, 'MM')
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

	const date = fromUnixTime(timestamp)
	data.year = format(date, 'yyyy')
	data.month = format(date, 'MM')
	data.day = format(date, 'dd')
	data.hour = format(date, 'HH')
	data.minute = format(date, 'mm')
	data.second = format(date, 'ss')

	data.weekday = format(date, 'EEEE') // Wednesday
	data.weekday_short = format(date, 'EEE') // Wed

	data.format_date = `${data.year}-${data.month}-${data.day}` // 2021-09-24
	data.format_time = format(date, 'HH:mm:ss')
	data.format_time_short = format(date, 'HH:mm')
	data.format_long = `${data.format_date} ${data.format_time_short}`

	return data
}

Screens.getGame = (game_name, game_code, icon16) => {

	return {
		code: game_code,
		name: game_name,
		icon16: icon16,
		icon48_url: `${config.static_url}screens/icons/48/${game_code}.webp`
	}
}

module.exports = Screens

// TODO get game variables