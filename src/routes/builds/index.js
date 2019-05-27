const utils = require('../../utils');

const BASE_URL_GIT = 'https://raw.githubusercontent.com/KrakenProject/official_devices/master'
const BASE_URL_SF = 'https://sourceforge.net/projects/krakenproject/files'

const fetchBuilds = (codename) => {
    return utils.request(`${BASE_URL_GIT}/builds/${codename}.json`)
    .then(json => json)
}

const fetchChangelog =  (filename, codename) => {
    return utils.request(`${BASE_URL_GIT}/changelog/${codename}/${filename.replace("zip","txt")}`, false)
    .then(text => text)
};

const fetchDownloadsCount = (filename, codename) => {
    return utils.request(`${BASE_URL_SF}/${codename}/${filename}/stats/json?start_date=2019-04-06&end_date=${utils.getToday()}`)
    .then(json => json);
};

const builds = async (codename) => {
     let res = {}
     
     let builds = await fetchBuilds(codename);
 
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
 module.exports = builds