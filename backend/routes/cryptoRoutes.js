const express = require('express');
const router = express.Router();
const { getAllCrypto, getGainers, getNewListings, addCrypto } = require('../controllers/cryptoController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/crypto
// @desc   Get all cryptocurrencies
// @access Public
router.get('/', getAllCrypto);

// @route   GET /api/crypto/gainers
// @desc   Get top gainers
// @access Public
router.get('/gainers', getGainers);

// @route   GET /api/crypto/new
// @desc   Get newest listings
// @access Public
router.get('/new', getNewListings);

// @route   POST /api/crypto\n// @desc   Add a new cryptocurrency\n// @access Private
router.post('/', protect, addCrypto);

module.exports = router;
