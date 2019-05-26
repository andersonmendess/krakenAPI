const routes = require('express').Router();

const devices = require('./devices')

routes.get('/', async (req, res) => {
    return res.json({ 'status':'ok'});
});

routes.get('/devices', async (req, res) => {
    return devices().then(e => res.json(e))
});

module.exports = routes;
