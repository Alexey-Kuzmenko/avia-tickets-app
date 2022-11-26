class Favorites {
    constructor() {
        this._favoriteTickets = [];
    }

    get favoriteTickets() {
        return this._favoriteTickets;
    }

    setfavoriteTicket(ticket) {
        this._favoriteTickets.push(ticket);
        // ! testing
        console.log(this._favoriteTickets.length);
    }

    removefavoriteTicket(ticket) {
        const ticketIndex = this._favoriteTickets.indexOf(ticket);
        this._favoriteTickets.splice(ticketIndex, 1);
    }
}

const favorites = new Favorites();

export default favorites;
