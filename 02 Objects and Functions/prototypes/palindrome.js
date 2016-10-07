
module.exports = function() {
	const len = this.length-1
	for (let i = 0; i <= len; i++) {
        console.log(`${this.charAt(i)} : ${this.charAt(len-1)}`)
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
module.exports = () => {
	const reversed = this.split('').reverse().join('')
	return (reversed === this.valueOf())
}
*/
