// * styles
import '../scss/style.scss'

// * modules
import './plugins'
import locations from './store/locations'
import formUi from './views/form'
import currencyUi from './views/currency'
import { changeDateFormat } from './helpers/date'
import ticketsUi from './views/tickets'
import alertUi from './views/alerts'

document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form
    initApp()

    // * Events
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        onFormSubmit()
    })

    form.addEventListener('reset', () => {
        ticketsUi.clearContainer()
        alertUi.clearAlertContainer()
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

        ticketsUi.renderTickest(locations.lastSearch)
    }

}, false)