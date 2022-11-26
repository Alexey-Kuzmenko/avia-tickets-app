class Favorites {
    constructor() {
        this._favoriteTickets = [];
        this._dropdownMenu = document.querySelector('.navbar-nav');
        // ? potential solution
        this.dropdownMenuContainer = document.querySelector('.nav-dropdown-menu');
    }

    get favoriteTickets() {
        return this._favoriteTickets;
    }

    get dropdownMenu() {
        return this._dropdownMenu;
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

    initDropdownMenu() {
        if (this._favoriteTickets.length >= 0) {
            this._dropdownMenu.classList.remove('navbar-nav--hidden');
        }
    }

    renderDropdownMenuItems(favoriteTickets) {
        this.clearDropdownMenuContainer();

        if (!favoriteTickets.length) {
            return;
        }

        let fragment = '';

        favoriteTickets.forEach((ticket) => {
            const dropdownItemTemplate = Favorites.itemTemplate(ticket);
            fragment += dropdownItemTemplate;
        });

        this.dropdownMenuContainer.insertAdjacentHTML('afterbegin', fragment);
    }

    clearDropdownMenuContainer() {
        this.dropdownMenuContainer.innerHTML = '';
    }

    static itemTemplate({ origin, destination, id }) {
        return `
        <li class="dropdown-item-body" data-ticket-id="${id}">
            <a class="nav-dropdown-item dropdown-item" href="#">
                <div class="nav-dropdown-item-content">
                    <p class="nav-dropdown-item-text">DSTN: ${origin}</p>
                    <i class="bi bi-arrow-right"></i>
                    <p class="nav-dropdown-item-text">ORG: ${destination}</p>
                </div>

                <button type="button" class="btn btn-light">
                <i class="bi bi-trash3"></i>
                </button>
            </a>
        </li>
        `;
    }
}

const favorites = new Favorites();

export default favorites;
