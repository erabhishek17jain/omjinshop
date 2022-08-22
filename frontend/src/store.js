import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from './middleware/reducers/userReducer';
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productsReducer,
    productReviewsReducer,
    reviewReducer,
} from './middleware/reducers/productReducer';
import { cartReducer } from './middleware/reducers/cartReducer';
import { saveForLaterReducer } from './middleware/reducers/saveForLaterReducer';
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
    paymentStatusReducer,
} from './middleware/reducers/orderReducer';
import { wishlistReducer } from './middleware/reducers/wishlistReducer';
import { categoryDeleteReducer, categoryReducer, categoryUpdateReducer, createCategoryReducer } from './middleware/reducers/categoryReducer';
import { pathReducer } from './middleware/reducers/pathReducer';

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    cart: cartReducer,
    saveForLater: saveForLaterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    paymentStatus: paymentStatusReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: productReviewsReducer,
    review: reviewReducer,
    wishlist: wishlistReducer,
    category: categoryReducer,
    newCategory: createCategoryReducer,
    updateCategory: categoryUpdateReducer,
    deleteCategory: categoryDeleteReducer,
    path: pathReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    },
    saveForLater: {
        saveForLaterItems: localStorage.getItem('saveForLaterItems') ? JSON.parse(localStorage.getItem('saveForLaterItems')) : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : [],
    },
    path: {
        pathItems: localStorage.getItem('pathItems') ? JSON.parse(localStorage.getItem('pathItems')) : [],
    },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
