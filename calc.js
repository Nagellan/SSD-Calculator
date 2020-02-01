/** Solves mathematical expression with +,-,/,* operations */
class Calculator {
  constructor() {
    this.parser = new Parser();
  }

  solve(str) {
    const expr = this.parser.parse(str);
  }
}

/** Parses string into expression tree if it's valid */
class Parser {
  constructor() {
    this.validator = new Validator();
  }

  parse(str) {
    str = this.validator.validateStr(str);
  }

  makeReversePolish(exprList) {
    const signIsLower = (token) => !!opStack.length && (/[+-]/.test(token) || ((/[*/]/.test(token) && /[*/]/.test(opStack[opStack.length - 1]))));

    let opStack = [],
        exprRevPolish = [];

    exprList.forEach(token => {
      if (!isNaN(token)) exprRevPolish.push(+token);
      else {
        while (signIsLower(token)) {
          exprRevPolish.push(opStack.pop());
        }
        opStack.push(token);
      }
    });

    return exprRevPolish.concat(opStack.reverse());
  }
}

/** Validates the string */
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