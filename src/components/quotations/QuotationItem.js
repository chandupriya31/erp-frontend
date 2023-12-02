import { Checkmark } from 'react-checkmark'
import { Link } from 'react-router-dom'
export function QuotationItem(props) {
   const { ele } = props
   console.log(ele, 'quotation-item')
   return (
      <tr className='text-center mt-3'>
         <td>{new Date(ele.date).toLocaleDateString()}</td>
         <td>{ele.enquiry}</td>
         <td>{new Date(ele.quotationExpiry).toLocaleDateString()}</td>
         <td>{ele.customer && ele.customer.username}</td>
         <td>{ele.product && ele.product.productname}</td>
         <td>{ele.quantity}</td>
         <td>{ele.unitPrice}</td>
         <td>{ele.totalCost}</td>
         <td>{ele.termsandconditions.delivery}</td>
         <td>{ele.termsandconditions.isApproved ? (
            <div>
               <Checkmark size='25px' />
               <Link>generate orderAcceptance</Link>
            </div>
         ) :
            ('pending')}</td>
      </tr>
   )
}  