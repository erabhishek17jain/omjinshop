const express = require('express');
const {
    signUpUser,
    signInUser,
    signOutUser,
    getUserDetails,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/signUp').post(signUpUser);
router.route('/signIn').post(signInUser);
router.route('/signOut').get(signOutUser);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

router
    .route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
