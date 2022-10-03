import api from "../service/apiService";

class Locations {
    constructor(api) {
        this.api = api
        this.countries = null
        this.cities = null
        this.shortCitiesList = null
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ])

        const [countries, cities] = response
        this.countries = this.serializeCountries(countries)
        this.cities = this.serializeCities(cities)
        this.shortCitiesList = this.createShortCitiesList(this.cities)

        return response
    }

    /*
        * autocomplete take data in this format:
        * [{lable: "City, Country", value: "City, Country"}]
    */

    createShortCitiesList(cities) {
        // ? potential solution
        const acArr = []
        Object.entries(cities).forEach(([key, data]) => {
            const obj = { label: key, value: data.code }
            acArr.push(obj)
        })
        return acArr
    }

    serializeCountries(countries) {
        // * return data: {'Country Code': {...}}
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc
        }, {})
    }

    serializeCities(cities) {
        // * return data: {'City, Country Code': {...}}
        return cities.reduce((acc, city) => {
            const countryName = this.getCountryNameByCode(city.country_code)
            const cityName = city.name_translations.en || city.name
            acc[`${cityName}, ${countryName}`] = city
            return acc
        }, {})
    }

    getCityCodeByName(cityName) {
        return this.cities[cityName].code
    }

    getCountryNameByCode(code) {
        return this.countries[code].name_translations.en
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params)
        console.log(response);
    }

}

const locations = new Locations(api);

export default locations

