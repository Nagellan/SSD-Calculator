class Calculator {
  constructor() {
    this.parser = new Parser();
  }

  solve(str) {
    const expr = this.parser.parse(str);
  }
}

class Parser {
  constructor() {
    this.validator = new Validator();
  }

  parse(str) {
    str = this.validator.validateStr(str);
  }
}

class Validator {
  strIsValid(str) {
    return /^\s*(\d+(?=\.)\.)?\d+\s*([+\-*/]\s*(\d+(?=\.)\.)?\d+\s*)*$/.test(str);
  }

  validateStr(str) {
    if (!this.strIsValid(str)) throw new Error("Input string is not valid!");
    return str;
  }

  validateExpr(expr) {
    // TODO
  }
}

export default new Calculator();