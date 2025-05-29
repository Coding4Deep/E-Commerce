const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
} = require('../controllers/productController');

router.route('/').get(getProducts);
router.route('/featured').get(getFeaturedProducts);
router.route('/:id').get(getProductById);

module.exports = router;