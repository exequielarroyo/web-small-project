const toUSD = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "USD"
});

export default function formater(value) {
	return toUSD.format(value);
}
