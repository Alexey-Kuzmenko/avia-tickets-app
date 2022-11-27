import favorites from '../store/favorites';

class DropdownUi {
    constructor(favorites) {
        this._dropdownMenu = document.querySelector('.navbar-nav');
        // ? potential solution
        this.dropdownMenuContainer = document.querySelector('.nav-dropdown-menu');
        this.favoriteTickets = favorites._favoriteTickets;
    }

    get dropdownMenu() {
        return this._dropdownMenu;
    }

    initDropdownMenu() {
        if (this.favoriteTickets.length >= 0) {
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
            const dropdownItemTemplate = DropdownUi.itemTemplate(ticket);
            fragment += dropdownItemTemplate;
        });

        this.dropdownMenuContainer.insertAdjacentHTML('afterbegin', fragment);
    }

    clearDropdownMenuContainer() {
        this.dropdownMenuContainer.innerHTML = '';
    }

    static itemTemplate({ origin, destination, airline_logo, departure_at, id }) {
        return `
        <li class="dropdown-item-body" data-ticket-id="${id}">
            <a class="nav-dropdown-item dropdown-item" href="#${id}">
                <img src="${airline_logo}" alt="Airline logo"
                    class="nav-dropdown-item-logo">
                <div class="nav-dropdown-item-content">
                        <p class="nav-dropdown-item-text">DSTN: ${origin}</p>
                        <i class="bi bi-arrow-right"></i>
                        <p class="nav-dropdown-item-text">ORG: ${destination}</p>
                        <div class="nav-dropdown-item-date">
                        <p class="nav-dropdown-item-text">
                            Depart date: ${departure_at}
                        </p>
                    </div>
                </div>

                <button type="button" class="btn btn-light">
                    <i class="bi bi-trash3"></i>
                </button>
            </a>
        </li>
        `;
    }
}

const dropdownUi = new DropdownUi(favorites);
export default dropdownUi;
