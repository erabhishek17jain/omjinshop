const express = require('express');
const { getAllCategory, createCategory, getAdminCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/category').get(getAllCategory);

router.route('/admin/category').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminCategory);
router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);

router
    .route('/admin/category/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;
