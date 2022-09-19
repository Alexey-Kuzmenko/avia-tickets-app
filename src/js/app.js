// * styles
import '../scss/style.scss'

// * modules
import './plugins'
import locations from './store/locations'


locations.init()
    .then(res => {
        // ! testing
        console.log(res)
        console.table(locations.getCitiesByCountryCode('UA'))
    })
    .catch(err => console.log(err))
