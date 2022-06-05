import dayjs from "dayjs";

const DateTimeHelper = {
  formatDate: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
  formatTime: (time: Date) => dayjs(time).format("H:m"),
  getRoundUpDate: (minutes: number, d = new Date()) => {
    const ms = 1000 * 60 * minutes;
    const roundedDate = new Date(Math.ceil(d.getTime() / ms) * ms);
    return roundedDate;
  },
};

export default DateTimeHelper;
