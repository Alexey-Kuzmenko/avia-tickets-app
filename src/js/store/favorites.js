class Favorites {
    constructor() {
        this._favoriteTickets = [];
    }

    get favoriteTickets() {
        return this._favoriteTickets;
    }

    setfavoriteTicket(ticket) {
        const { id } = ticket;
        if (this._favoriteTickets.find((ticket) => id === ticket.id)) {
            return;
        }
        this._favoriteTickets.push(ticket);
    }

    removefavoriteTicket(ticket) {
        const ticketIndex = this._favoriteTickets.indexOf(ticket);
        this._favoriteTickets.splice(ticketIndex, 1);
    }

    getfavoriteTicketById(id) {
        return this._favoriteTickets.find((ticket) => ticket.id === id);
    }
}

const favorites = new Favorites();

export default favorites;
