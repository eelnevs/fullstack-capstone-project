export const camelToTitleCase = (word) =>
	[...word]
		.map((w, i) =>
			i === 0 ? w.toUpperCase() : w === w.toUpperCase() ? ` ${w}` : w
		)
		.join("");

export const formatDate = (timestamp) => {
	const time = new Date(timestamp * 1000);
	return time.toLocaleDateString("en-US");
};
