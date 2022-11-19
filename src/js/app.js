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
// ! testing
import favorites from './store/favorites'


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

    // ! testing 
    function onTicketClick(e) {
        if (e.target.classList.contains('add-to-favorites-btn') || e.target.classList.contains('bi-heart')) {
            e.currentTarget.classList.toggle('border-info')
            const ticketId = e.currentTarget.dataset.ticketId
            const ticketObj = locations.lastSearch.find(ticket => ticket.id === ticketId)
            // ! testing
            console.log(ticketObj);
            favorites.setfavoriteTicket(ticketObj)
        }
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

        // ? potential solution
        const ticketsCards = document.querySelectorAll('.tickets-card')
        setAddEventListener(ticketsCards)

        function setAddEventListener(arrOfNodes) {
            if (!arrOfNodes.length) {
                console.error('Array of tickets is empty');
                return
            } else {
                [...arrOfNodes].forEach(ticket => {
                    ticket.addEventListener('click', onTicketClick)
                })
            }
        }

    }

}, false)