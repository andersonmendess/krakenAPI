const fetch = require('node-fetch');
const utils = require('../../utils');

const devices = () => {
    return utils.request('https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json')
    .then(res => sanitize(res))
}

const sanitize = (json) => {

    let list = [];

    // brands
    let brands = json.map((device) => device.brand).unique()

    console.log(brands)

    // devices by brand
    list = brands.map((brand) => {
        return {name : brand, devices: json.filter(device => device.brand == brand)
            .map(i => { return { name: i.name, codename: i.codename } })}
    })

   return list;
}

module.exports = devices