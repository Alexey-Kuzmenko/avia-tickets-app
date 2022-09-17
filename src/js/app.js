// * styles
import '../scss/style.scss'
import api from "./service/apiService";

api.countries()
    .then(res => console.log(res))
    .catch(err => console.log(err))

api.cities()
    .then(res => console.log(res))
    .catch(err => console.log(err))
