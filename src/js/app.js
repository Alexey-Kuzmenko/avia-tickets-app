// * styles
import '../scss/style.scss'
import locations from './store/locations'


locations.init()
    .then(res => {
        // ! testing
        console.log(res)
        console.table(locations.getCitiesByCountryCode('UA'))
    })
    .catch(err => console.log(err))
