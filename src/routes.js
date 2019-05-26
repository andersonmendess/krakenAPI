const routes = require('express').Router();

routes.get('/', async (req, res) => {
    return res.json({ 'status':'ok'});
});

module.exports = routes;
