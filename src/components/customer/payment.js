import React, { useState } from 'react';

const PaymentForm = () => {
   const [quotationId, setQuotationId] = useState('');
   const [amount, setAmount] = useState('');

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               // Include any necessary authentication headers
            },
            body: JSON.stringify({
               quotationId: quotationId,
               amount: amount
            })
         });

         const { id, url } = await response.json();
         // Redirect to Stripe checkout page or handle the response as needed
      } catch (error) {
         console.error('Error:', error);
         // Handle error scenarios here
      }
   };

   return (
      <div>
         <h1>Payment Form</h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="quotationId">Quotation ID:</label>
            <input
               type="text"
               id="quotationId"
               value={quotationId}
               onChange={(e) => setQuotationId(e.target.value)}
               required
            />
            <br />
            <br />
            <label htmlFor="amount">Amount:</label>
            <input
               type="number"
               id="amount"
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               required
            />
            <br />
            <br />
            <button type="submit">Pay Now</button>
         </form>
      </div>
   );
};

export default PaymentForm;
