const routes = require('express').Router();
const boom = require('express-boom')

const devices = require('./devices')
const builds = require('./builds')

routes.get('/', async (req, res) => {
    return res.json({ 'status':'Pindola de Borboleta'});
});

routes.get('/devices', async (req, res) => {
    return devices.getAll().then(e => res.json(e)).catch(ex => res.json(ex))
});

routes.get('/devices/:codename', (req, res) => {
    return devices.get(req.params.codename)
            .then(e => res.json(e))
            .catch(ex => res.sendStatus(404).json(ex))
});

routes.get('/devices/:codename/builds', async (req, res) => {
    return builds(req.params.codename).then(e => res.json(e)).catch(ex => res.json(ex))
});

module.exports = routes;
