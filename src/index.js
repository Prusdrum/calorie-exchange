const ko = require('knockout');
const root = document.querySelector("#app");
const CalculatorViewModel = require('./calculator-view-model')
ko.applyBindings(new CalculatorViewModel(), root);