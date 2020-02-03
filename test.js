const calc = require('./calc.js');
const assert = require('assert');

if (process.argv[2] !== undefined) {
  console.log("Result: " + calc.solve(process.argv[2]) + "\nLast actions:");
  calc.getLastActions(5).forEach(record => console.log(record));
} else {
  calc.clearHistory();

  describe('Correctness of operation priorities:', () => {
    it('\'22.3+1+111/2*12-1\' should return 688.3', () => {
      assert.equal(calc.solve('22.3+1+111/2*12-1'), 688.3);
    });
  
    it('\'2+2*2\'             should return 6', () => {
      assert.equal(calc.solve('2+2*2'), 6);
    });
  });

  describe('History of actions:', () => {
    it('Get last 2 actions:  should return \'2+2*2 = 6,22.3+1+111/2*12-1 = 688.3\'', () => {
      assert.equal(calc.getLastActions(2).toString(), '2+2*2 = 6,22.3+1+111/2*12-1 = 688.3');
    });

    it('Get last 10 actions: should return \'2+2*2 = 6,22.3+1+111/2*12-1 = 688.3\'', () => {
      assert.equal(calc.getLastActions(10).toString(), '2+2*2 = 6,22.3+1+111/2*12-1 = 688.3');
    });

    it('Get last 0 actions:  should return \'\'', () => {
      assert.equal(calc.getLastActions(0).toString(), '');
    });
  });

  describe('Skipping empty spaces:', () => {
    it('\'  22.3 +  1 +111/  2* 12-  1 \' should return 688.3', () => {
      assert.equal(calc.solve('  22.3 +  1 +111/  2* 12-  1 '), 688.3);
    });
  });

  describe('Negative numbers:', () => {
    it('\'-  1.211 +2*3.2\'     should return 5.189', () => {
      assert.equal(calc.solve('-  1.211 +2*3.2'), 5.189);
    });
  
    it('\'-19.211 + 0.1 * 3.2\' should return -18.891', () => {
      assert.equal(calc.solve('-19.211 + 0.1 * 3.2'), -18.891);
    });
  });

  describe('Single number:', () => {
    it('\'2  \' should return 2', () => {
      assert.equal(calc.solve('2  '), 2);
    });
  });

  describe('Errors:', () => {
    it('\'\'       should return Error: Input string is empty!', () => {
      assert.throws(() => calc.solve(''), Error, "Input string is empty!");
    });

    it('\'2%1\'    should return Error: Input string is not valid!', () => {
      assert.throws(() => calc.solve('2%1'), Error, "Input string is not valid!");
    });
  
    it('\'2.1++1\' should return Error: Input string is not valid!', () => {
      assert.throws(() => calc.solve('2.1++1'), Error, "Input string is not valid!");
    });
  
    it('\'5/0\'    should return Error: Division on zero!', () => {
      assert.throws(() => calc.solve('5/0'), Error, "Division on zero!");
    });
  });
}