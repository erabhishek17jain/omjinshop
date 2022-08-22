// Category Used In Entire App
export const categories = ['Electronics', 'Mobiles', 'Laptops', 'Fashion', 'Appliances', 'Home Decore'];

export const baseUrl = [
    { title: 'Home', path: '/', tab: 'home' },
    { title: 'Sign In', path: '/signIn/', tab: 'signIn' },
    { title: 'Sign Up', path: '/signUp/', tab: 'signUp' },
    { title: 'Reset Password', path: '/password/reset', tab: 'reset' },
    { title: 'Cart', path: '/cart/', tab: 'cart' },
    { title: 'Products', path: '/products/', tab: 'products' },
    { title: 'TodaysOffers', path: '/todaysOffers/', tab: 'todaysOffers' },
    { title: 'TopOffers', path: '/topOffers/', tab: 'topOffers' },
    { title: 'AboutUs', path: '/about/', tab: 'about' },
    { title: 'ContactUs', path: '/contact/', tab: 'contact' },
    { title: 'FAQs', path: '/faqs/', tab: 'faqs' },
    { title: 'ReturnAndCancel', path: '/returnPolicy/', tab: 'returnPolicy' },
];

export const adminSideBarUrl = [
    { title: 'Admin Dashboard', path: '/admin/dashboard', tab: 'adDashboard' },
    { title: 'My Account', path: '/account/', tab: 'account' },
    { title: 'Profile', path: '/account/profile', tab: 'profile' },
    { title: 'Orders', path: '/admin/orders', tab: 'adOrders' },
    { title: 'Products', path: '/admin/products', tab: 'adProducts' },
    { title: 'Category', path: '/admin/category', tab: 'adCategory' },
    { title: 'Users', path: '/admin/users', tab: 'adUsers' },
    { title: 'Reviews', path: '/admin/reviews', tab: 'adReviews' },
    { title: 'Change Password', path: '/account/profile/update', tab: 'passwordUpdate' },
];

export const userSideBarUrl = [
    { title: 'My Account', path: '/account/', tab: 'account' },
    { title: 'Profile', path: '/account/profile', tab: 'profile' },
    { title: 'Wishlist', path: '/account/wishlist', tab: 'wishlist' },
    { title: 'Orders', path: '/account/orders', tab: 'orders' },
    { title: 'Track Order', path: '/account/trackOrder', tab: 'trackOrder' },
    { title: 'Address Book', path: '/account/addressBook', tab: 'reviews' },
    { title: 'Returns &amp; Cancellations', path: '/returnPolicy', tab: 'returnPolicy' },
    { title: 'Change Password', path: '/account/profile/update', tab: 'passwordUpdate' },
    // { title: 'Reviews &amp; Ratings', path: '/account/reviews', tab: 'reviews' },
    // { title: 'Payment Options', path: '/account/paymentOption', tab: 'payment' },
    // { title: 'PAN Card Information', path: '/account/panCardDetails', tab: 'panCard' },
    { title: 'FAQs', path: '/faqs', tab: 'faqs' },
];

export const orderColumns = [
    {
        field: 'id',
        headerName: 'Order ID',
    },
    {
        field: 'itemsQty',
        headerName: 'Items Qty',
    },
    {
        field: 'amount',
        headerName: 'Amount',
    },
    {
        field: 'orderOn',
        headerName: 'Order On',
    },
    {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => {
            return (
                <>
                    {params.row.status === 'Delivered' ? (
                        <span className='text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800'>{params.row.status}</span>
                    ) : params.row.status === 'Shipped' ? (
                        <span className='text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800'>{params.row.status}</span>
                    ) : (
                        <span className='text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800'>{params.row.status}</span>
                    )}
                </>
            );
        },
    },
    {
        field: 'actions',
        headerName: 'Actions',
    },
];

export const states = [
    {
        code: 'AN',
        name: 'Andaman and Nicobar Islands',
    },
    {
        code: 'AP',
        name: 'Andhra Pradesh',
    },
    {
        code: 'AR',
        name: 'Arunachal Pradesh',
    },
    {
        code: 'AS',
        name: 'Assam',
    },
    {
        code: 'BR',
        name: 'Bihar',
    },
    {
        code: 'CG',
        name: 'Chandigarh',
    },
    {
        code: 'CH',
        name: 'Chhattisgarh',
    },
    {
        code: 'DH',
        name: 'Dadra and Nagar Haveli',
    },
    {
        code: 'DD',
        name: 'Daman and Diu',
    },
    {
        code: 'DL',
        name: 'Delhi',
    },
    {
        code: 'GA',
        name: 'Goa',
    },
    {
        code: 'GJ',
        name: 'Gujarat',
    },
    {
        code: 'HR',
        name: 'Haryana',
    },
    {
        code: 'HP',
        name: 'Himachal Pradesh',
    },
    {
        code: 'JK',
        name: 'Jammu and Kashmir',
    },
    {
        code: 'JH',
        name: 'Jharkhand',
    },
    {
        code: 'KA',
        name: 'Karnataka',
    },
    {
        code: 'KL',
        name: 'Kerala',
    },
    {
        code: 'LD',
        name: 'Lakshadweep',
    },
    {
        code: 'MP',
        name: 'Madhya Pradesh',
    },
    {
        code: 'MH',
        name: 'Maharashtra',
    },
    {
        code: 'MN',
        name: 'Manipur',
    },
    {
        code: 'ML',
        name: 'Meghalaya',
    },
    {
        code: 'MZ',
        name: 'Mizoram',
    },
    {
        code: 'NL',
        name: 'Nagaland',
    },
    {
        code: 'OR',
        name: 'Odisha',
    },
    {
        code: 'PY',
        name: 'Puducherry',
    },
    {
        code: 'PB',
        name: 'Punjab',
    },
    {
        code: 'RJ',
        name: 'Rajasthan',
    },
    {
        code: 'SK',
        name: 'Sikkim',
    },
    {
        code: 'TN',
        name: 'Tamil Nadu',
    },
    {
        code: 'TS',
        name: 'Telangana',
    },
    {
        code: 'TR',
        name: 'Tripura',
    },
    {
        code: 'UP',
        name: 'Uttar Pradesh',
    },
    {
        code: 'UK',
        name: 'Uttarakhand',
    },
    {
        code: 'WB',
        name: 'West Bengal',
    },
];
