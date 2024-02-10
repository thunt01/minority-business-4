import React, { useState } from 'react';

const CheckoutForm = () => {

    // hold all form data in a singular structure
    const [checkoutData, setCheckoutData ] = useState({
        billingAddress: "",
        paymentMethod: "", 
        shippingAddress: ""
    });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setCheckoutData((prevCheckoutData) => ({ ...prevCheckoutData, [name]: value }));
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        alert(`billingAddress: ${checkoutData.billingAddress}, paymentMethod: ${checkoutData.paymentMethod}, 
        shippingAddress: ${checkoutData.shippingAddress}`);
    };

  return (

    <form onSubmit={handleSubmit}>
        <label htmlFor="billingAddress">Billing Address:</label>
        <input type="text" id="billingAddress" name="billingAddress" value={checkoutData.billingAddress} onChange={handleChange}/>

        <label htmlFor="paymentMethod">Payment Method:</label>
        <input type="text" id="paymentMethod" name="paymentMethod" value={checkoutData.paymentMethod} onChange={handleChange}/>

        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input type="text" id="shippingAddress" name="shippingAddress" value={checkoutData.shippingAddress} onChange={handleChange}/>

        <button type="submit">Submit</button>
    </form>

  );
};

export default CheckoutForm;