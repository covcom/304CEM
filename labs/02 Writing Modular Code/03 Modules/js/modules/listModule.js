
var items = Array()

export function add(item) {
	items.push(item)
}

const HALF = 0.5;

export function sqrt(x) {
	return Math.exp(HALF * Math.log(x));
}
