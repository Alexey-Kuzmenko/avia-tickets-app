import api from "../service/apiService";
import { formatDate } from "../helpers/date";

class Locations {
    constructor(api, helpers) {
        this.api = api
        this.countries = null
        this.cities = null
        this.shortCitiesList = null
        this.airlines = null
        this.lastSearch = null
        this.formatDate = helpers.formatDate
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ])

        const [countries, cities, airlines] = response
        this.countries = this.serializeCountries(countries)
        this.cities = this.serializeCities(cities)
        this.shortCitiesList = this.createShortCitiesList(this.cities)
        this.airlines = this.serializeAirlines(airlines)

        return response
    }

    /*
        * autocomplete take data in this format:
        * [{lable: "City, Country", value: "City, Country"}]
    */

    createShortCitiesList(cities) {
        // ? potential solution
        const acArr = []
        Object.values(cities).forEach((data) => {
            const obj = { label: data.fullName, value: data.code }
            acArr.push(obj)
        })
        return acArr
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.logo = `https://pics.avs.io/200/200/${airline.code}.png`
            airline.name = airline.name || airline.name_translations.en
            acc[airline.code] = airline
            return acc
        }, {})
    }

    serializeCountries(countries) {
        // * return data: {'Country Code': {...}}
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc
        }, {})
    }

    serializeCities(cities) {
        // * return data: {'City Code': {...}}
        return cities.reduce((acc, city) => {
            city.name = city.name_translations.en || city.name
            const countryName = this.getCountryNameByCode(city.country_code)
            const fullName = `${city.name}, ${countryName}`
            acc[city.code] = {
                ...city,
                fullName,
                countryName,
            }
            return acc
        }, {})
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    getCityCodeByName(cityName) {
        const city = Object.values(this.cities).find(city => city.fullName === cityName)
        return city.code
    }

    getCityNameByCode(code) {
        return this.cities[code].name
    }

    getCountryNameByCode(code) {
        return this.countries[code].name_translations.en
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params)
        this.lastSearch = this.serializeTickets(response.data)
        console.log(this.lastSearch);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map(ticket => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm')
            }
        })
    }

}

const locations = new Locations(api, { formatDate });

export default locations

