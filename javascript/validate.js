//Dependencies
const validator = require("validator");

//Holds all validation functionality
const validate = {
  validateString(str) {
    return str !== "" || "Please enter a valid response!";
  },
  validateSalary(num) {
    if (validator.isDecimal(num)) return true;
    return "Please enter a valid Salary!";
  },
  isSame(str1, str2) {
    if (str1 === str2) return true;
  },
};

module.exports = validate;
