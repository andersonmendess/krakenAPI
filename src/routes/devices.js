const utils = require('../utils');

const fetchDeviceDetails = (codename) => {
    return utils.request('github', '/devices.json')
    .then(json => json.filter((device) => device.codename == codename));
}

const device = async (codename) => {

    res = {};

    let details = await fetchDeviceDetails(codename);

    res['device'] = details[0];

    let  resBuilds = await builds(codename)
    res['builds'] = resBuilds.builds
    
    return res;
}

const devices = () => {
    return utils.request('github', 'devices.json')
    .then(res => sanitize(res))
}

const sanitize = (json) => {
    return json
        .map(device => device.brand).unique()
        .map(brand => ({ name: brand, 
            devices: json.filter(device => device.brand === brand )}))
}

module.exports = { devices, device }