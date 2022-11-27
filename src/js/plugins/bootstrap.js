import * as bootstrap from 'bootstrap';

// * autocomplete plugin for bootstrap 5
import { Autocomplete } from './autocomplete';

const acInputOptions = {
    data: null,
    maximumItems: 5,
    treshold: 1,
};

function initAutocompleteInput(input) {
    const acInput = new Autocomplete(input, acInputOptions);
    return acInput;
}

export { initAutocompleteInput };
