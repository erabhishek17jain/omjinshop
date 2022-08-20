const express = require('express');
const { getAllCategory, newCategory, getAdminCategory } = require('../../frontend/src/middleware/actions/categoryAction');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();
router.route('/category').get(getAllCategory);

router.route('/admin/category').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminCategory);
router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCategory);

module.exports = router;
