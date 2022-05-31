const titleCase = (string: string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

const camelToString = (string: string) => {
  var result = string.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const parseThousand = (number: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const convertCommasToNumber = (string: string) => {
  return Number(string.replace(/,/g, ""));
};

export { titleCase, camelToString, parseThousand, convertCommasToNumber };
