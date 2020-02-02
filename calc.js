/** Solves mathematical expression with +,-,/,* operations */
class Calculator {
  constructor() {
    this.parser = new Parser();
    this.exprTreeBuilder = new ExprTreeBuilder();
  }

  solve(str) {
    const exprList = this.parser.parse(str),
      exprTree = this.exprTreeBuilder.build(exprList);
  }
}

/** Parses string, if it's valid, into list of tokens */
class Parser {
  constructor() {
    this.validator = new Validator();
  }

  parse(str) {
    str = this.validator.validateStr(str);
    return str.match(/(\d+(?=\.)\.)?\d+|[+\-*/]/g);
  }
}

/** Validates the string */
class Validator {
  strIsValid = str =>
    /^\s*(\d+(?=\.)\.)?\d+\s*([+\-*/]\s*(\d+(?=\.)\.)?\d+\s*)*$/.test(str);

  validateStr(str) {
    if (!this.strIsValid(str)) throw new Error("Input string is not valid!");
    return str;
  }
}

/** Builds expression tree from the list of parsed tokens */
class ExprTreeBuilder {
  build(exprList) {
    const exprRevPolish = this.makeReversePolish(exprList);
    return this.buildExprTree(exprRevPolish);
  }

  makeReversePolish(exprList) {
    const signIsLower = token =>
      !!opStack.length &&
      (/[+-]/.test(token) ||
        (/[*/]/.test(token) && /[*/]/.test(opStack[opStack.length - 1])));

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

  buildExprTree(exprRevPolish) {
    const expr = new Expression();

    exprRevPolish.reverse().forEach(token => {
      if (!isNaN(token)) expr.addNode(token);
      else {
        switch (token) {
          case "+":
            expr.addNode(new Sum());
            break;
          case "-":
            expr.addNode(new Sub());
            break;
          case "*":
            expr.addNode(new Mult());
            break;
          case "/":
            expr.addNode(new Div());
            break;
          default:
            throw new Error(
              "Incorrect sign token in expression tree building!"
            );
        }
      }
    });

    return expr;
  }
}

/** Tree representation of mathematical expression */
class Expression {
  constructor() {
    this.expr = null;
  }

  addNode(node, parent = this.expr) {
    if (!this.expr) this.expr = node;
    else {
      if (isNaN(parent.right)) node = this.addNode(node, parent.right);

      if (!!node) {
        if (isNaN(parent.left)) node = this.addNode(node, parent.left);

        if (!parent.right) {
          parent.right = node;
          return null;
        } else if (!parent.left) {
          parent.left = node;
          return null;
        }
      }

      return node;
    }
  }
}

/** Mathematical operation */
class Operation {
  constructor(sign = "", priority = null) {
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
