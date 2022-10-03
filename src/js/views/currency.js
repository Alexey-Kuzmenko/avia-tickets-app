class CurrencyUI {
    constructor() {
        this.select = document.querySelector('#currency-picker')
    }

    get currencyValue() {
        return this.select.value
    }
}

const currencyUi = new CurrencyUI();

export default currencyUi