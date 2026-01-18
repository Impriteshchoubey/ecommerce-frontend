import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], subtotal = 0, shipping = 0, total = 0 } = location.state || {};

  const handleShopAgain = () => {
    navigate("/"); // redirect to shop/home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-green-600 text-5xl mb-2">🎉</div>
          <h1 className="text-4xl font-extrabold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        </div>

        {/* Items Purchased */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Order Details</h2>
          <div className="border rounded-lg divide-y">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-3"
              >
               <span className="font-medium text-gray-700">
  {item.title || item.name || "Product"}
</span>

                <span className="text-gray-800">
                  {item.quantity} × ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Summary */}
        <div className="mb-6 px-4">
          <div className="flex justify-between text-gray-600 py-1">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600 py-1">
            <span>Shipping</span>
            <span>₹ {shipping}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold text-gray-900 py-1">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>

        {/* Shop Again Button */}
        <button
          onClick={handleShopAgain}
          className="w-full bg-linear-to-r from-green-600 to-green-500 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-600 transition duration-300 text-lg font-semibold"
        >
          Shop Again
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
