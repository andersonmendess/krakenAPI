const utils = require('../../utils');
const builds = require('../builds')


const fetchDeviceDetails = (codename) => {
    return utils.request('https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json')
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


module.exports = device