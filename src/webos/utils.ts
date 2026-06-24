import { TaskReminder } from '../shared/interfaces/tasks.interface';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const pad2 = (value: number): string => String(value).padStart(2, '0');

const formatFromDate = (date: Date): string => {
	const day = pad2(date.getDate());
	const month = MONTHS_SHORT[date.getMonth()];
	return `${day} ${month}`;
};

export const parseDateString = (dateString: string): Date | null => {
	if (!dateString || typeof dateString !== 'string') {
		return null;
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
			return parsedDate;
		}
	}

	const normalized = trimmed.replace(/\//g, '-');
	const fallback = new Date(normalized);
	if (Number.isNaN(fallback.getTime())) {
		return null;
	}

	return fallback;
};

export const formatDateToDayMonth = (dateString: string): string => {
	const parsedDate = parseDateString(dateString);
	if (!parsedDate) {
		return dateString;
	}

	return formatFromDate(parsedDate);
};

export const toIsoDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const toMonthLabel = (date: Date): string => {
	return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
};

export const getCalendarGrid = (month: Date): Array<Date | null> => {
	const start = new Date(month.getFullYear(), month.getMonth(), 1);
	const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
	const startWeekday = (start.getDay() + 6) % 7;
	const totalCells = Math.ceil((startWeekday + end.getDate()) / 7) * 7;

	return Array.from({ length: totalCells }, (_, index) => {
		const dayNumber = index - startWeekday + 1;
		if (dayNumber < 1 || dayNumber > end.getDate()) {
			return null;
		}

		return new Date(month.getFullYear(), month.getMonth(), dayNumber);
	});
};

export const formatReminderSummary = (reminder: TaskReminder): string => {
	const date = new Date(reminder.date);

	if (Number.isNaN(date.getTime())) {
		return `${reminder.date} at ${reminder.time} Hrs.`;
	}

	const day = date.getDate();
	const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
	const month = date.toLocaleString('en-US', { month: 'short' });

	return `${day}${suffix} ${month} at ${reminder.time} Hrs.`;
};
