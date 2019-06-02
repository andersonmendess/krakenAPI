const utils = require('../utils')
const builds = require('./builds')
const boom = require('express-boom')

const fetchDeviceDetails = (codename) => {
    return utils.request('github', '/devices.json')
    .then(json => json.filter((device) => device.codename == codename)[0]);
}

const get = async (codename) => {

    res = {};
    let device = await fetchDeviceDetails(codename);

    if(!device){
        throw "Not Found"
    }
    res['device'] = device
    let resBuilds = await builds(codename)
    res['builds'] = resBuilds.builds
    
    return res;

    
}

const getAll = () => {
    return utils.request('github', '/devices.json')
    .then(res => sanitize(res))
}

const sanitize = (json) => {
    return json
        .map(device => device.brand).unique()
        .map(brand => ({ name: brand, 
            devices: json.filter(device => device.brand === brand )}))
}

module.exports = { get, getAll }