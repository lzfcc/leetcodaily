var daysBetweenDates = function(date1, date2) {
	const daysForMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	const daysInYearForDate = (year, month, day) => {
		const monthDays = [...daysForMonths];
		if (isLeapYear(year)) monthDays[2] = 29;
		let days = 0;
		for (let m = 1; m < month; m++) {
			days += monthDays[m];
		}
		days += day;
		return days;
	}
	
	if (date1 > date2) {
		[date1, date2] = [date2, date1];
	}
	const [y1, m1, d1] = date1.split('-').map(Number);
	const [y2, m2, d2] = date2.split('-').map(Number);
	let days = 0;
	for (let y = y1; y < y2; y++) {
		days += isLeapYear(y) ? 366 : 365;
	}
	days = days + daysInYearForDate(y2, m2, d2) - daysInYearForDate(y1, m1, d1);
	return days;
};

daysBetweenDates("2019-06-30", "1987-4-8");
daysBetweenDates("2000-7-22", "2029-12-19")