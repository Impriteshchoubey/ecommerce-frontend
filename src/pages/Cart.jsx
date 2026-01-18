import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [subtotal, setSubtotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  const shippingCost = productData.length > 0 ? 50 : 0;
  const total = subtotal + shippingCost;

  // Calculate subtotal
  useEffect(() => {
    let price = 0;
    productData.forEach((item) => (price += item.price * item.quantity));
    setSubtotal(Number(price.toFixed(2)));
  }, [productData]);

  // PAY NOW CLICK
  const handlePayNow = () => {
    if (!userInfo) {
      toast.error("Please sign in to continue payment");
      return;
    }
    if (productData.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowPayment(true);
  };

  // STRIPE PAYMENT SUBMIT
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);

      // 1️⃣ Create Payment Intent
      const { data } = await axios.post(
        "http://localhost:5000/create-payment-intent",
        { amount: total * 100 } // in paise/cents
      );

      // 2️⃣ Confirm Card Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful 🎉");

        // Redirect to Payment Success page with order data
        navigate("/payment-success", {
          state: {
            items: productData,
            subtotal,
            shipping: shippingCost,
            total,
          },
        });
      }
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 px-4">

        {/* LEFT – CART ITEMS */}
        <div className="w-full md:w-2/3">
          <CartItem />
        </div>

        {/* RIGHT – BILLING & PAYMENT */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Billing Summary
            </h2>

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₹ {shippingCost}</span>
            </div>

            <hr className="my-3 border-gray-300" />

            <div className="flex justify-between text-xl font-semibold text-gray-900">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            {!showPayment && (
              <button
                onClick={handlePayNow}
                className="w-full bg-linear-to-r from-black to-gray-800 text-white py-3 mt-5 rounded-xl shadow hover:shadow-lg transition duration-300"
              >
                Pay Now
              </button>
            )}

            {/* STRIPE PAYMENT FORM */}
            {showPayment && (
              <form onSubmit={handlePayment} className="mt-5 flex flex-col gap-4">

                {/* Card Number */}
                <div className="flex flex-col gap-1 p-3 border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
                  <label className="text-gray-600 font-medium">Card Number</label>
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#1F2937",
                          "::placeholder": { color: "#9CA3AF" },
                        },
                        invalid: { color: "#EF4444" },
                      },
                    }}
                  />
                </div>

                {/* Expiry Date */}
                <div className="flex flex-col gap-1 p-3 border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
                  <label className="text-gray-600 font-medium">Expiry Date</label>
                  <CardExpiryElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#1F2937",
                          "::placeholder": { color: "#9CA3AF" },
                        },
                        invalid: { color: "#EF4444" },
                      },
                    }}
                  />
                </div>

                {/* CVC */}
                <div className="flex flex-col gap-1 p-3 border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
                  <label className="text-gray-600 font-medium">CVC</label>
                  <CardCvcElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#1F2937",
                          "::placeholder": { color: "#9CA3AF" },
                        },
                        invalid: { color: "#EF4444" },
                      },
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
                >
                  {loading ? "Processing..." : `Pay ₹ ${total}`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-left" theme="dark" />
    </div>
  );
};

export default Cart;
