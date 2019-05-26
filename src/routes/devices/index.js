const fetch = require('node-fetch');
require('../../utils').Array;

const devices = () => {
    return fetch('https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json')
    .then(res => res.json())
    .then(json => sanitize(json));
}

const sanitize = (json) => {

    // brands
    let brands = json.map((device) => device.brand).unique()

    // devices by brand
    let list = brands.map((brand) => {
        return { [brand] : json.filter((device) => device.brand == brand)}
    })

   return list;
}

module.exports = devices