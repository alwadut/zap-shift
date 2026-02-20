import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { parcelId } = useParams(); // this id from router which means the parcels id .
    console.log(parcelId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
      >
        {/* Card Input Field */}
        <div className="p-3 border rounded-lg">
          <CardElement />
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          Pay
        </button>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
