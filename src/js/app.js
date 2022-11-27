// * styles
import '../scss/style.scss';

// * modules
import './plugins';
import locations from './store/locations';
import formUi from './views/form';
import currencyUi from './views/currency';
import { changeDateFormat } from './helpers/date';
import ticketsUi from './views/tickets';
import alertUi from './views/alerts';
import favorites from './store/favorites';
import dropdownUi from './views/dropdown';

document.addEventListener('DOMContentLoaded', () => {
    const form = formUi.form;
    const dropdownMenu = dropdownUi._dropdownMenu;
    initApp();

    // * Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    form.addEventListener('reset', () => {
        ticketsUi.clearContainer();
        alertUi.clearAlertContainer();
        dropdownUi.clearDropdownMenuContainer();
    });

    dropdownMenu.addEventListener('click', onDropdownClick, false);

    // ! Handlers
    async function initApp() {
        await locations.init();
        formUi.setAcInputData(locations.shortCitiesList);
    }

    function onTicketClick({ target, currentTarget }) {
        if (target.classList.contains('add-to-favorites-btn') || target.classList.contains('bi-heart')) {
            ticketsUi.setTickestStyles(currentTarget);
            const ticketId = currentTarget.dataset.ticketId;
            const ticketObj = locations.getTicketById(ticketId);
            dropdownUi.initDropdownMenu();
            favorites.setfavoriteTicket(ticketObj);
        }
    }

    function onDropdownClick() {
        dropdownUi.renderDropdownMenuItems(favorites._favoriteTickets);
        const dropdownItems = document.querySelectorAll('.dropdown-item-body');
        [...dropdownItems].forEach((dropdownItem) => {
            dropdownItem.addEventListener('click', onDropdownItemClick, false);
        });
    }

    function onDropdownItemClick(e) {
        e.stopPropagation();
        if (e.target.classList.contains('btn') || e.target.classList.contains('bi-trash3')) {
            e.currentTarget.remove();
            const ticketId = e.currentTarget.dataset.ticketId;
            const ticketObj = favorites.getfavoriteTicketById(ticketId);
            favorites.removefavoriteTicket(ticketObj);
            const [...ticketsCards] = ticketsUi.getContainer().children;
            const ticketCard = ticketsCards.find((ticket) => ticket.id === ticketId);
            ticketsUi.removeTickestStyles(ticketCard);
        }
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByName(formUi.originValue);
        const destination = locations.getCityCodeByName(formUi.destinationValue);
        const depart_dalue = changeDateFormat(formUi.departDateValue);
        const return_date = changeDateFormat(formUi.returnDateValue);
        const currency = currencyUi.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_dalue,
            return_date,
            currency,
        });

        ticketsUi.renderTickest(locations.lastSearch);
        const ticketsCards = document.querySelectorAll('.tickets-card');
        setAddEventListener(ticketsCards);

        function setAddEventListener(arrOfNodes) {
            if (!arrOfNodes.length) {
                throw new Error('Array of tickets is empty');
            }

            [...arrOfNodes].forEach((ticket) => {
                ticket.addEventListener('click', onTicketClick);
            });
        }
    }
}, false);
