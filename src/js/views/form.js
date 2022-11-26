import * as Autocomplete from '../plugins/bootstrap';
import alertUi from './alerts';

class FormUI {
    constructor(initAutocompleteInput) {
        this._form = document.forms['search-form'];
        this.origin = document.querySelector('#origin');
        this.destination = document.querySelector('#destination');
        this.departDate = document.querySelector('#depart-date-picker');
        this.returnDate = document.querySelector('#return-date-picker');
        this.acOriginInput = initAutocompleteInput(this.origin);
        this.acDestinationInput = initAutocompleteInput(this.destination);
    }

    get form() {
        return this._form;
    }

    setAcInputData(data) {
        this.acOriginInput.setData(data);
        this.acDestinationInput.setData(data);
    }

    get originValue() {
        return FormUI.checkInputData(this.origin.value);
    }

    get destinationValue() {
        return FormUI.checkInputData(this.destination.value);
    }

    get departDateValue() {
        return FormUI.checkInputData(this.departDate.value);
    }

    get returnDateValue() {
        return FormUI.checkInputData(this.returnDate.value);
    }

    static checkInputData(inputValue) {
        if (!inputValue.length) {
            alertUi.renderAlert();
        } else {
            return inputValue;
        }
    }
}

const formUi = new FormUI(Autocomplete.initAutocompleteInput);

export default formUi;
