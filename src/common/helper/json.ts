export function jsonParser(obj: any) {
	if (typeof obj !== 'object') return obj;

	for (const key in obj) {
		if (typeof obj[key] === 'bigint') {
			const strInt = obj[key].toString();
			obj[key] = isNaN(parseInt(strInt)) ? strInt : parseInt(strInt).toString();
		} else if (typeof obj[key] === 'object') {
			obj[key] = jsonParser(obj[key]);
		}
	}

	return obj;
}