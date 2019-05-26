const fetch = require('node-fetch');
require('../../utils').Array;

const devices = () => {
    return fetch('https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json')
    .then(res => res.json())
    .then(json => sanitize(json));
}

const sanitize = (json) => {

    let list = [];

    // brands
    let brands = json.map((device) => device.brand).unique()

    // devices by brand
    list = brands.map((brand) => {
        return {name : brand, devices: json.filter(device => device.brand == brand)
            .map(i => { return { name: i.name, codename: i.codename } })}
    })

   return list;
}

module.exports = devices