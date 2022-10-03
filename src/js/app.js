// * styles
import '../scss/style.scss'

// * modules
import './plugins'
import locations from './store/locations'
import formUi from './views/form'
import currencyUi from './views/currency'


document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form
    console.log(currencyUi.select);
    initApp()

    // * Events
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        onFormSubmit()
    })

    // ! Handlers
    async function initApp() {
        await locations.init()
        formUi.setAcInputData(locations.shortCitiesList)
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByName(formUi.originValue)
        const destination = locations.getCityCodeByName(formUi.destinationValue)
        const depart_dalue = changeDateFormat(formUi.departDateValue)
        const return_date = changeDateFormat(formUi.returnDateValue)
        const currency = currencyUi.currencyValue

        await locations.fetchTickets({
            origin,
            destination,
            depart_dalue,
            return_date,
            currency,
        })
    }

}, false)

function changeDateFormat(date) {
    const [year, month, day] = date.split('-')
    const newDateFormat = `${year}-${month}`
    return newDateFormat
}