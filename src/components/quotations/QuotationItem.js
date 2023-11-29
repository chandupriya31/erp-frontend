export function QuotationItem(props) {
   const { ele } = props
   console.log(ele, 'i')
   return (
      <tr>
         <td>{new Date(ele.date).toLocaleDateString()}</td>
         <td>{ele.enquiry._id}</td>
         <td>{new Date(ele.quotationExpiry).toLocaleDateString()}</td>
         <td>{ele.customer && ele.customer.username}</td>
         <td>{ele.product && ele.product.productname}</td>
         <td>{ele.quantity}</td>
         <td>{ele.unitPrice}</td>
         <td>{ele.totalCost}</td>
         <td>{ele.termsandconditions.delivery}</td>
      </tr>
   )
}  