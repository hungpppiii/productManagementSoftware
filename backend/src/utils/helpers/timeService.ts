const MINUTE_TO_MILLISECOND = 1000 * 60;

const addTimeByMinute = (d: Date, minute: number) => {
	return new Date(d.getTime() + minute * MINUTE_TO_MILLISECOND);
};

const timeDiffByMinute = (d1: Date, d2: Date) => {
	return Math.abs(d1.getTime() - d2.getTime()) / MINUTE_TO_MILLISECOND;
};

const timeDiffByMonth = (startTime: Date, endTime: Date) => {
	return endTime.getMonth() - startTime.getMonth() + 12 * (endTime.getFullYear() - startTime.getFullYear());
};

export { addTimeByMinute, timeDiffByMinute, timeDiffByMonth };
