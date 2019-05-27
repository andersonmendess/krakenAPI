const utils = require('../../utils');

const devices = () => {
    return utils.request('https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json')
    .then(res => sanitize(res))
}

const sanitize = (json) => {
    
    return json
        .map(device => device.brand).unique()
        .map(brand => ({ name: brand, 
            devices: json.filter(device => device.brand === brand )}))
}

module.exports = devices