import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { parcelId } = useParams(); // this id from router which means the parcels id .
  const axiosSecure = UseAxiosSecure();
  console.log(parcelId);

  const { isPending, data: parcelInfo } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId, // 🔥 important
  });

  if (isPending) {
    return "loading...";
  }

  if (!parcelInfo) {
    return "No parcel found";
  }
  console.log(parcelInfo);

  const price = parcelInfo.deliveryCost;
  const amountInCents = price * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    // step 1 : validate the card 
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    // step 2  create payment intent

    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "",
        },
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment is successed ",result);
      }
    }
    console.log("res from intent ", res);
    
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
          Pay ${price}
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
