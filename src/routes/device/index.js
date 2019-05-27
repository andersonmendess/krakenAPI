const utils = require('../../utils');

const fetchBuilds = (codename) => {
    return utils.request(`https://raw.githubusercontent.com/KrakenProject/official_devices/master/builds/${codename}.json`)
    .then(json => json)
}

const fetchChangelog =  (filename, codename) => {
    return utils.request(`https://raw.githubusercontent.com/KrakenProject/official_devices/master/changelog/${codename}/${filename.replace("zip","txt")}`, false)
    .then(text => text)
};

const fetchDeviceDetails = (codename) => {
    return utils.request('https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json')
    .then(json => json.filter((device) => device.codename == codename));
}

const fetchDownloadsCount = (filename, codename) => {
    return utils.request(`https://sourceforge.net/projects/krakenproject/files/${codename}/${filename}/stats/json?start_date=2019-04-06&end_date=${utils.getToday()}`)
    .then(json => json);
};



const device = async (codename) => {

    res = {};

    let details = await fetchDeviceDetails(codename);

    if(!!!details) return {message: 'device not found'}

    res['device'] = details[0];

    let builds = await fetchBuilds(codename);

    if(!!!builds){
        res['builds'] = []
        return res
    }

    const promises = builds.response.map(async (build) => {

        let changelog = await fetchChangelog(build.filename, codename);
        let downloads = await fetchDownloadsCount(build.filename, codename);

        return {
            filename: build.filename,
            size : utils.humanSize(build.datetime),
            datetime: utils.humanDate(build.datetime),
            md5: build.id,
            url: build.url,
            version: build.version,
            downloads: downloads.total,
            changelog: changelog,
        }

    })

    res['builds'] = await Promise.all(promises)
 
    return res;
}


module.exports = device