import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Ask backend to create PaymentIntent
      const { data } = await axios.post(
        "http://localhost:5000/create-payment-intent",
        { amount: total * 100 }
      );

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful 🎉");
      }
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <CardElement className="p-3 border rounded" />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 mt-4"
      >
        Pay Now
      </button>
    </form>
  );
};

export default Checkout;
