class CurrencyUI {
    constructor() {
        this.select = document.querySelector('#currency-picker')
        this.dictionary = {
            USD: '$',
            EUR: '€'
        }
    }

    get currencyValue() {
        return this.select.value
    }

    getCurrencySymbol() {
        return this.dictionary[this.currencyValue]
    }
}

const currencyUi = new CurrencyUI();

export default currencyUi