import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh'); //this key provide by the stipe but this one is test key 
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;