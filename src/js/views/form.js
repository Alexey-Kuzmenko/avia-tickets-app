import * as Autocomplete from '../plugins/bootstrap'

class FormUI {
    constructor(initAutocompleteInput) {
        this._form = document.forms['search-form']
        this.origin = document.querySelector('#origin')
        this.destination = document.querySelector('#destination')
        this.departDate = document.querySelector('#depart-date-picker')
        this.returnDate = document.querySelector('#return-date-picker')
        this.acOriginInput = initAutocompleteInput(this.origin)
        this.acDestinationInput = initAutocompleteInput(this.destination)
    }

    get form() {
        return this._form
    }

    setAcInputData(data) {
        this.acOriginInput.setData(data)
        this.acDestinationInput.setData(data)
    }

    get originValue() {
        // return this.origin.value
        return FormUI.checkInputData(this.origin.value)
    }

    get destinationValue() {
        // return this.destination.value
        return FormUI.checkInputData(this.destination.value)
    }

    get departDateValue() {
        // return this.departDate.value
        return FormUI.checkInputData(this.departDate.value)
    }

    get returnDateValue() {
        // return this.returnDate.value
        return FormUI.checkInputData(this.returnDate.value)
    }

    static checkInputData(inputValue) {
        if (inputValue === '') {
            alert('Please fill in all inputs')
            return
        } else {
            return inputValue
        }
    }

}

const formUi = new FormUI(Autocomplete.initAutocompleteInput);

export default formUi