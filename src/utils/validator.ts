import { camelToString, titleCase } from "./stringHelper";

const numberValidator = (rule: any, value: any, callback: any) => {
  try {
    if (!Number(value) && value) {
      const tmp = camelToString(rule.field);
      callback("Please, enter number!");
    } else {
      callback();
    }
  } catch {
    callback();
  }
};

export { numberValidator };
