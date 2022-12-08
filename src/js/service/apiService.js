import axios from 'axios';
import config from '../config/apiConfig';

/*
    * /countries - arr for countries
    * /cities - arr of cities
    * /prices/cheap - arr of airlines
*/

class Api {
    constructor(config) {
        this.url = config.url;
        this.token = config.token
    }

    async countries() {
        try {
            const response = await axios.get(`${this.url}/data/uk/countries.json`);
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }

    async cities() {
        try {
            const response = await axios.get(`${this.url}/data/uk/cities.json`);
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }

    async prices(params) {
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params,
            });
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }

    async airlines() {
        try {
            const response = await axios.get(`${this.url}/data/ru/airlines.json`);
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api;
