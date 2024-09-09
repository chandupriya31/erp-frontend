import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export default function Myenquires(props) {
   const { enquiries } = props
   const enquiry = enquiries.my_enquiries
   console.log(enquiry, 'my')
   return (
      <div>
         <h2>Enquiries based on Companies</h2>
         <ListGroup style={{ width: '400px' }}>
            {enquiry && enquiry.length > 0 ? (
               enquiry.map((ele) => (
                  <Link to={`/enquirylist/${ele._id}`} class='text-decoration-none'>
                     <div class="rounded ">
                        <ListGroup.Item action key={ele._id}>
                           <div class='fw-semibold fs-5'>
                              {ele.company && ele.company.companyname} - {ele.product_id?.productname}
                           </div>
                        </ListGroup.Item>
                     </div>
                  </Link>
               ))
            ) : (
               <ListGroup.Item>No enquiries available</ListGroup.Item>
            )}
         </ListGroup>
      </div >
   )
}