const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const pad2 = (value: number): string => String(value).padStart(2, '0');

const formatFromDate = (date: Date): string => {
	const day = pad2(date.getDate());
	const month = MONTHS_SHORT[date.getMonth()];
	return `${day} ${month}`;
};

export const formatDateToDayMonth = (dateString: string): string => {
	if (!dateString || typeof dateString !== 'string') {
		return dateString;
	}

	const trimmed = dateString.trim();
	const simpleMatch = trimmed.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);

	if (simpleMatch) {
		const year = Number(simpleMatch[1]);
		const month = Number(simpleMatch[2]);
		const day = Number(simpleMatch[3]);
		const parsedDate = new Date(year, month - 1, day);

		if (
			parsedDate.getFullYear() === year
			&& parsedDate.getMonth() === month - 1
			&& parsedDate.getDate() === day
		) {
			return formatFromDate(parsedDate);
		}
	}

	const fallback = new Date(trimmed);
	if (Number.isNaN(fallback.getTime())) {
		return trimmed;
	}

	return formatFromDate(fallback);
};
