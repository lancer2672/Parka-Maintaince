const convertToThounsandSeparator = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const convertToHour = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  let hour = minutes / 60;
  return hour > 1 ? `${hour} hours` : `${hour} hour`;
};

export { convertToThounsandSeparator, convertToHour };
