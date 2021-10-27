'use strict';
const express = require('express')
const {cat_list_get} = require('../controllers/catController');
const router = express.Router();

router.get('/', cat_list_get);

router.get('/cat/:id', (req, res) => {
  res.send('You requested a cat whose id is ' + req.params.id)
});

router.post('/cat', (req, res) => {
  res.send('From this endpoint you can post cats.')
});

router.put('/cat', (req, res) => {
  res.send('From this endpoint you can edit cats.')
});

router.delete('/cat', (req, res) => {
  res.send('From this endpoint you can delete cats.')
});

module.exports = router;
