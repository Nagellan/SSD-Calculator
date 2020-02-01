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
}

/** Tree representation of mathematical expression */
class Expression {
  constructor() {
    this.expr = null;
  }
}

/** Mathematical operation */
class Operation {
  constructor(sign="", priority=null) {
    this.left = null;
    this.right = null;

    this.getSign = () => sign;
    this.getPriority = () => priority;
  }

  do = () => null;
}

/** Arithmetic sum */
class Sum extends Operation {
  constructor() {
    super("+", 2);
  }

  do = () => this.left + this.right;
}

/** Arithmetic subtraction */
class Sub extends Operation {
  constructor() {
    super("-", 2);
  }

  do = () => this.left - this.right; 
}

/** Arithmetic multiplication */
class Mult extends Operation {
  constructor() {
    super("*", 1);
  }

  do = () => this.left * this.right;
}

/** Arithmetic division */
class Div extends Operation {
  constructor() {
    super("/", 1);
  }

  do = () => this.left / this.right;
}

export default new Calculator();