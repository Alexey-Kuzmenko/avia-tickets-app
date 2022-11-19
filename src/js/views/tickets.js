import currencyUi from "./currency"

class TicketsUI {
    constructor(getCurrencySymbol) {
        this.container = document.querySelector('.grid-container')
        this.currencySymbol = getCurrencySymbol.bind(currencyUi)
    }

    renderTickest(tickets) {
        this.clearContainer()

        if (tickets.length === 0) {
            this.showEmptyMessage()
            return
        } else {

            let fragment = ''
            let currency = this.currencySymbol()

            tickets.forEach(ticket => {
                const tktTemplate = TicketsUI.ticketTemplate(ticket, currency)
                fragment += tktTemplate
            });

            this.container.insertAdjacentHTML('afterbegin', fragment)
        }
    }

    getContainer() {
        return this.container
    }

    clearContainer() {
        this.container.innerHTML = ''
    }

    showEmptyMessage() {
        const msgTemplate = TicketsUI.emptyMsgTemplate()
        this.container.insertAdjacentHTML('afterbegin', msgTemplate)
    }

    static emptyMsgTemplate() {
        return `
        <div class="alert alert-warning text-center" role="alert">
            Sorry, we don't find any tickets for your request <i class="bi bi-emoji-frown"></i>
        </div>
        `
    }

    static ticketTemplate(ticket, currency) {
        return `
        <div class="card tickets-card" data-ticket-id="${ticket.id}">
            <img src="${ticket.airline_logo}" class="card-img-top" alt="Airline logo">
            <div class="card-body">
                <h5 class="card-title text-center">${ticket.airline_name}</h5>
                <hr>
                <div class="card-text text-center my-3">
                    <span class="fs-5 fw-bold">Origin: ${ticket.origin_name}</span>
                    <span class="fs-5 fw-bold">Destination: ${ticket.destination_name}</span>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item px-0"><i class="bi bi-calendar2-event"></i>
                        Depart date: ${ticket.departure_at}
                    </li>
                    <li class="list-group-item px-0"><i class="bi bi-calendar2-event"></i>
                        Return date: ${ticket.return_at}
                    </li>
                    <li class="list-group-item px-0"><i class="bi bi-airplane"></i>
                        Flight number: ${ticket.flight_number}
                    </li>
                    <li class="list-group-item px-0"><i class="bi bi-arrow-down-up"></i> Transfers:
                        ${ticket.transfers}
                    </li>
                </ul>
            </div>
            <div class="card-footer">
                <p class="fs-5 fw-bold mb-0">Price: ${currency}${ticket.price}</p>
                <div class="card-footer-controls d-flex justify-content-between">
                    <a href="#" class="btn btn-primary text-uppercase">Buy</a>
                    <a class="btn btn-light add-to-favorites-btn"><i class="bi bi-heart"></i></a>
                </div>
            </div>
        </div>
        `
    }
}

const ticketsUi = new TicketsUI(currencyUi.getCurrencySymbol);

export default ticketsUi