import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
export default function Myenquires(props) {
   const { enquiries } = props
   const enquiry = enquiries.myenquiries
   console.log(enquiry, 'my')
   return (
      <div>
         <h2>Enquiries based on Companies</h2>
         <ListGroup>
            {enquiry && enquiry.length > 0 ? (
               enquiry.map((ele) => (
                  <ListGroup.Item action key={ele._id}>
                     <Link to={`/enquirylist/${ele.company._id}`}>{ele.company && ele.company.companyname}</Link>
                  </ListGroup.Item>
               ))
            ) : (
               <ListGroup.Item>No enquiries available</ListGroup.Item>
            )}
         </ListGroup>

      </div>
   )
}