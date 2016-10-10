
module.exports = function() {
	const len = this.length-1
	for (let i = 0; i <= len; i++) {
		if (this.charAt(i) !== this.charAt(len-i)) {
			return false
		}
		if (i === (len-i)) {
			return true
		}
	}
	return true
}

/*
// a more elegant solution: can you see how it works?
module.exports = function() {
	const reversed = this.split('').reverse().join('')
	return (reversed === this.valueOf())
}
*/
