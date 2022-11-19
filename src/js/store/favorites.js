
class Favorites {
    constructor() {
        this._favoriteTickets = []
    }

    get favoriteTickets() {
        return this._favoriteTickets
    }

    setfavoriteTicket(ticket) {
        this._favoriteTickets.push(ticket)
        // ! testing
        console.log(this._favoriteTickets.length);
    }

}

const favorites = new Favorites();

export default favorites