import React from 'react';

const PriceSidebar = ({ cartItems, placeOrderHandler }) => {
    return (
        <>
            {/* <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
        <div className="flex flex-col bg-white rounded-sm shadow">
          <h1 className="px-6 py-3 border-b font-medium text-gray-500">PRICE DETAILS</h1>
          <div className="flex flex-col gap-4 p-6 pb-3">
            <p className="flex justify-between">
              Price ({cartItems.length} item)
              <span>₹{cartItems.reduce((sum, item) => sum + item.cuttedPrice * item.quantity, 0).toLocaleString()}</span>
            </p>
            <p className="flex justify-between">
              Discount{' '}
              <span className="text-primary-green">
                - ₹{cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity - item.price * item.quantity), 0).toLocaleString()}
              </span>
            </p>
            <p className="flex justify-between">
              Delivery Charges <span className="text-primary-green">FREE</span>
            </p>
            <div className="border border-dashed"></div>
            <p className="flex justify-between text-lg font-medium">
              Total Amount <span>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</span>
            </p>
            <div className="border border-dashed"></div>
            <p className="font-medium text-primary-green">
              You will save ₹
              {cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity - item.price * item.quantity), 0).toLocaleString()} on this
              order
            </p>
          </div>
        </div>
      </div> */}
            <div className="f-cart__pad-box">
                <div className="u-s-m-b-30">
                    <table className="f-cart__table">
                        <tbody>
                            <tr>
                                <td>PRICE ({cartItems.length} item)</td>
                                <td>
                                    <span>₹{cartItems.reduce((sum, item) => sum + item.cuttedPrice * item.quantity, 0).toLocaleString()}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>DISCOUNT</td>
                                <td>
                                    <span className="text-primary-green">
                                        - ₹
                                        {cartItems
                                            .reduce((sum, item) => sum + (item.cuttedPrice * item.quantity - item.price * item.quantity), 0)
                                            .toLocaleString()}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>DELIVERY CHARGES</td>
                                <td>
                                    <span className="text-primary-green">FREE</span>
                                </td>
                            </tr>
                            <tr>
                                <td>TOTAL AMOUNT</td>
                                <td>
                                    <span>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="f-cart">
                    <button className="btn btn--e-brand-b-2" onClick={placeOrderHandler} disabled={cartItems.length < 1 ? true : false}>
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </>
    );
};

export default PriceSidebar;
