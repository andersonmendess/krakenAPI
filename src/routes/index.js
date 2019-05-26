const routes = require('express').Router();

const devices = require('./devices')
const device = require('./device')

routes.get('/', async (req, res) => {
    return res.json({ 'status':'ok'});
});

routes.get('/devices', async (req, res) => {
    return devices().then(e => res.json(e))
});

routes.get('/devices/:codename', async (req, res) => {
    return device(req.params.codename).then(e => res.json(e))
});

module.exports = routes;
