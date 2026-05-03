const Crypto = require('../models/Crypto');

// @route   GET /api/crypto
// @desc   Get all cryptocurrencies
// @access Public
const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find({}).sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/crypto/gainers
// @desc   Get top gainers (highest 24h change)
// @access Public
const getGainers = async (req, res) => {
  try {
    const cryptos = await Crypto.find({}).sort({ change24h: -1 }).limit(10);
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/crypto/new
// @desc   Get newest listings
// @access Public
const getNewListings = async (req, res) => {
  try {
    const cryptos = await Crypto.find({}).sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/crypto
// @desc   Add a new cryptocurrency
// @access Public
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h
    });

    if (crypto) {
      res.status(201).json(crypto);
    } else {
      res.status(400).json({ message: 'Invalid crypto data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCrypto, getGainers, getNewListings, addCrypto };
