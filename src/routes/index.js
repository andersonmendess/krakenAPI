const routes = require('express').Router();

const devices = require('./devices')
const builds = require('./builds')

routes.get('/', async (req, res) => {
    return res.json({ 'status':'ok'});
});

routes.get('/devices', async (req, res) => {
    return devices().then(e => res.json(e)).catch(ex => res.json(ex))
});

routes.get('/devices/:codename', async (req, res) => {
    return device(req.params.codename).then(e => res.json(e)).catch(ex => res.json(ex))
});

routes.get('/devices/:codename/builds', async (req, res) => {
    return builds(req.params.codename).then(e => res.json(e)).catch(ex => res.json(ex))
});

module.exports = routes;
