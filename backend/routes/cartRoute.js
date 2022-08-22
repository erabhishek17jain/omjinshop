const express = require('express');
const { getAllCart } = require('../controllers/cartController');

const router = express.Router();

router.route('/cart/all').get(getAllCart);

module.exports = router;
