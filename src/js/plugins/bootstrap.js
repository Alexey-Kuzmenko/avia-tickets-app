import * as bootstrap from 'bootstrap';

// * autocomplete plugin for bootstrap 5
import { Autocomplete } from './autocomplete'

const originInput = document.querySelector('#origin')
const destinationInput = document.querySelector('#destination')


const ac = new Autocomplete(originInput, {
    data: null,
    maximumItems: 5,
    treshold: 1,
    onSelectItem: ({ label, value }) => {
        console.log("user selected:", label, value);
    }
});

ac.setData([
    { label: 'Kyiv', value: 'kyiv' },
    { label: 'Lviv', value: 'lviv' },
    { label: 'Kharkiv', value: 'kharkiv' },
])


// ! purpose
// function setAutocompleteData(data) {
    
// }
// ac.setData(setAutocompleteData)

// export { setAutocompleteData }