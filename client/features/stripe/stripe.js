// import React from 'react';
// import StripeCheckout from 'react-stripe-checkout';

// const StripeCheckoutButton = ({ price }) => {
//     const priceForStripe = price * 100;
//     const publishableKey = 'pk_test_51MimvdJje9l8edfLLSffhlYiQTZ6YObv7E1XWhP5YMHUbts9qb2bZWS3IjnTNrQw7xW0SsCnErTVf0dTc0f7fckv00w6quc3X1';
//     const onToken = token => {
//         console.log(token);
//         alert('Payment Successful');
//     };

//     return (
//         <StripeCheckout
//             label='Pay Now'
//             name='CRWN Clothing Ltd.'
//             billingAddress
//             shippingAddress
//             image='https://svgshare.com/i/CUz.svg'
//             description={`Your total is $${price}`}
//             amount={priceForStripe}
//             panelLabel='Pay Now'
//             token={onToken}
//             stripeKey={publishableKey}
//         />
//     );
// };

// export default StripeCheckoutButton;
