const ko = require('knockout')
const _ = require('lodash')

class CalculatorViewModel {
    constructor() {
        this.products = ko.observableArray([
            { 
                name: 'Banan', selected: ko.observable(false), id: ko.observable(_.uniqueId())
            },
            { 
                name: 'Jabłko', selected: ko.observable(false), id: ko.observable(_.uniqueId())
            },
        ])
    }
}

module.exports = CalculatorViewModel;