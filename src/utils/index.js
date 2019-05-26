const fetch = require('node-fetch');


Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

const humanSize = (bytes) => {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const humanDate = (timestamp) => {
  let d = new Date(timestamp * 1000)
  let mm = ('0' + (d.getUTCMonth() + 1)).slice(-2)
  let dd = ('0' + d.getUTCDate()).slice(-2)
  return `${d.getFullYear()}/${mm}/${dd}`;
};

const request = (url, isJson = true) => {
  return fetch(url).then((res) => isJson ? res.json() : res.text()).catch((e) => console.log(e))
}

const getToday = () => {
  let d = new Date();
  return `${d.getFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`
}

module.exports = { Array, humanDate, humanSize, request, getToday };