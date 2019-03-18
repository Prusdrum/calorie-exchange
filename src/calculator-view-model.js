const ko = require('knockout')
const _ = require('lodash')
const products = require('./data.json')

class CalculatorViewModel {
    constructor() {
        this.inWeight = ko.observable(100);
        this.selectedProduct = ko.observable(null);
        this.products = ko.observableArray(products.map(data => {
            return {
                id: ko.observable(_.uniqueId('product-')),
                name: data.name,
                value: data.value,
                selected: ko.observable(false)
            }
        }))

        this.results = ko.computed(() => {
            if (this.selectedProduct() === null) {
                return [];
            }

            return this.products().map((product) => {
                const newVal = (product.value * this.inWeight()) / this.selectedProduct().value;
                return {
                    name: product.name,
                    value: Math.round((newVal * 100) / 100)
                }
            })
        });
    }

    onChange(product) {
        this.selectedProduct(product);
    }

    isSelected(product) {
        return product === this.selectedProduct()
    }
}

module.exports = CalculatorViewModel;