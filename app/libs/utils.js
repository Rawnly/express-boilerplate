const required = (type, extra = {}) => Object.assign({ required: true, type }, extra)
const date = (extra = {}) => Object.assign({
	type: Date,
	default: Date.now()
}, extra)

/**
 * 
 * @param {Number} len String length
 * @param {Object} options Options 
 * @param {Boolean} options.onlyNumbers 
 * @param {Boolean} options.onlyLetters
 * 
 * @return {String} A random string
 */
export const randomString = (len = 7, {
	onlyNumbers = false,
	onlyLetters = false,
}) => {
	let src = '',  str = '';

	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "01234567890";

	if ( onlyLetters ) {
		src = alphabet;
	} else if ( onlyNumbers ) {
		src = numbers
	} else {
		src = alphabet + numbers
	}

	for(let i=0; i<len; i++) {
		str += src[Math.floor( Math.random() * src.length )];
	}

	return str;
}

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 */
export const randomNumber = (min, max) => {
	if (min && !max) {
		max = min;
		min = 0;
	}

	return (Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 */
export const randomInt = (min, max) => {
	if ( min && !max ) {
		max = min;
		min = 0; 
	}

	return Math.floor((Math.random() * (max - min + 1)) + min)
};

export const round = (n, decimals = 0) => Math.floor(n, Math.pow(10, decimals));
export const randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];
export const mergeObjects = (...objects) => objects.reduce((a,b) => Object.assign(a, b));
export const sortAscending = (...items) => items.sort();
export const sortDescending = (...items) => items.sort().reverse();
export const capitalizeWord = word => word.charAt(0).toUpperCase() + word.substr(1, word.length);
export const capitalize = sentence => sentence.split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.substr(1, word.length)).join(' ');
export const camelCase = word => word.split(/-+|_+|\.|/).map(word => word.charAt(0).toUpperCase() + word.substr(1, word.length)).join('');

export const regex = {
	email: /[a-z0-9\.]+@[a-z0-9\.]{2,}\.[a-z0-9\.]{2,}/
}

export const SchemaUtils = { required, date };