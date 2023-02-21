const express = require('express');
const crudController = require('./crud.controller');
const Stock = require('../models/stock.model');
const authenticate = require('../middlewares/authenticate');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('', isLoggedIn, (req, res) => {
	console.log(res.locals);
	res.render('index');
});

router.get('/login', isLoggedIn, (req, res) => {
	res.render('login');
});

router.get('/home', isLoggedIn, authenticate, (req, res) => {
	res.render('dashboard');
});

router.get('/discover', isLoggedIn, (req, res) => {
	res.render('discover');
});

router.get('/smallcases', isLoggedIn, (req, res) => {
	res.render('smallcase');
});

router.get('/watchlist', isLoggedIn, authenticate, (req, res) => {
	res.render('watchlist');
});
module.exports = router;
