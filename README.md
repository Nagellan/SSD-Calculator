# SSD-Calculator
Assignment for Software System Design subject at Innopolis University, 6th semester

## Objectives

* Implement simple calculator
* Apply simple OOP principles
* Practice writing Unit tests

## Requirements

* Addition, subtraction, multiplication and division of two real numbers
* Handle operations priorities as the input isn't parenthesized
* Handle special cases and show error messages (e.g. division by zero)
* Store history of the last 5 actions
* Write unit tests

## How to install

1. Clone repository
```
git clone https://github.com/Nagellan/SSD-Calculator.git
```
2. Go to project folder
```
cd SSD-Calculator
```
3. Download & install [nodejs](https://nodejs.org/en/download/)
```
sudo apt-get install nodejs // for Ubuntu Linux
```
4. Install dependencies
```
npm install
```

## How to use

* Run automatic tests
```
npm test
```
* Use calculator manually
```
node test.js <mathematical expression>
node test.js 2+2*2
node test.js "   2 +2 *  2"
```
