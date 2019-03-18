const ko = require('knockout')
const _ = require('lodash')
const fruits = require('./fruits.json')
const vegetables = require('./vegetables.json')

const FRUITS = 'fruits';
const VEGETABLES = 'vegetables'

class CalculatorViewModel {
    constructor() {
        this.selectedGroup = ko.observable(FRUITS)
        this.inWeight = ko.observable(100);
        this.selectedProduct = ko.observable(null);
        this.products = ko.computed(() => {
            if (this.fruitsSelected()) {
                return _.sortBy(fruits.map(data => {
                    return {
                        id: ko.observable(_.uniqueId('product-')),
                        name: data.name,
                        value: data.value,
                        selected: ko.observable(false)
                    }
                }), (i) => i.name)
            } else {
                return _.sortBy(vegetables.map(data => {
                    return {
                        id: ko.observable(_.uniqueId('product-')),
                        name: data.name,
                        value: data.value,
                        selected: ko.observable(false)
                    }
                }), (i) => i.name)
            }
        })
        this.selectedGroup.subscribe(() => {
            this.selectedProduct(null);
        });

        this.results = ko.computed(() => {
            if (this.selectedProduct() === null) {
                return [];
            }

            return this.products().map((product) => {
                const newVal = (product.value * this.inWeight()) / this.selectedProduct().value;
                return {
                    name: product.name,
                    value: newVal.toFixed(1)
                }
            })
        });

        this.reminder = ko.computed(() => {
            if (!this.selectedProduct()) {
                return '';
            }
            const product = this.selectedProduct();
            return `Wybrane: ${product.name} ${this.inWeight()} [gram] - ${this.getCalories().toFixed(1)} kcal`
        });
    }

    getCalories() {
        const FRUITS_CALORIES_FOR_BASE = 47;
        const VEGETABLES_CALORIES_FOR_BASE = 29;
        if (this.fruitsSelected()) {
            return this.inWeight() * FRUITS_CALORIES_FOR_BASE / this.selectedProduct().value
        } else {
            return this.inWeight() * VEGETABLES_CALORIES_FOR_BASE / this.selectedProduct().value
        }
    }

    onChange(product) {
        this.selectedProduct(product);
    }

    isSelected(product) {
        return product === this.selectedProduct()
    }

    turnFruits() {
        this.selectedGroup(FRUITS)
    }

    turnVegetables() {
        this.selectedGroup(VEGETABLES)
    }

    fruitsSelected() {
        return this.selectedGroup() === FRUITS;
    }

    vegetablesSelected() {
        return this.selectedGroup() === VEGETABLES;
    }
}

module.exports = CalculatorViewModel;