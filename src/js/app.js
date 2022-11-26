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
import favorites from './store/favorites'

document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form
    const dropdownMenu = favorites._dropdownMenu
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

    dropdownMenu.addEventListener('click', onDropdownClick, false)

    // ! Handlers
    async function initApp() {
        await locations.init()
        formUi.setAcInputData(locations.shortCitiesList)
    }

    function onTicketClick(e) {
        if (e.target.classList.contains('add-to-favorites-btn') || e.target.classList.contains('bi-heart')) {
            e.target.classList.toggle('add-to-favorites-btn--active')
            e.currentTarget.classList.toggle('border-info')
            const ticketId = e.currentTarget.dataset.ticketId
            const ticketObj = locations.lastSearch.find(ticket => ticket.id === ticketId)

            //  ? maybe dropdown should init when inited all app
            favorites.initDropdownMenu()
            favorites.setfavoriteTicket(ticketObj)
        }
    }

    // ! dropdown menu handler 
    function onDropdownClick() {
        favorites.renderDropdownMenuItems(favorites._favoriteTickets)
        console.log(favorites.favoriteTickets);

        const dropdownItems = document.querySelectorAll('.dropdown-item-body');

        // ? potential solution
        [...dropdownItems].forEach(dropdownItem => {
            dropdownItem.addEventListener('click', onDropdownItemClick, false)
        });
    }

    function onDropdownItemClick(e) {
        e.stopPropagation()
        if (e.target.classList.contains('btn') || e.target.classList.contains('bi-trash3')) {
            e.currentTarget.remove()
            const ticketId = e.currentTarget.dataset.ticketId
            const ticketObj = favorites._favoriteTickets.find(ticket => ticket.id === ticketId)
            favorites.removefavoriteTicket(ticketObj)
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