import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startGetEnquiries } from "../../actions/enquiry-action";
export default function Enquirylist({ enquiries }) {
   const dispatch = useDispatch()
   const { userState } = useContext(UserContext)
   const { id } = useParams()
   console.log(id)
   const enquiry = userState.user?.my_enquiries?.find((ele) => ele._id === id)

   useEffect(() => {
      (async () => {
         dispatch(startGetEnquiries())
      })()
   }, [])

   const eid = enquiry && enquiry._id
   console.log(eid)
   console.log(enquiry, 'enquiry')
   //console.log(enquiry?.productId, 'product')
   return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
         <div className="mx-auto p-5">
            <Card border="primary" className='shadow p-3 mb-5 bg-body rounded' style={{ width: '500px' }}>
               <div className="d-flex justify-content-center text-primary ">
                  <Card.Header><b>Enquiry details</b></Card.Header>
               </div>
               <ListGroup variant="flush">
                  <ListGroup.Item>EnquiryId - <b>{enquiry && enquiry._id}</b></ListGroup.Item>
                  <ListGroup.Item>EnquiryDate - <b>{enquiry && enquiry.date && new Date(enquiry.date).toLocaleDateString()}</b></ListGroup.Item>
                  <ListGroup.Item>ProductName - <b>{enquiry && enquiry?.product_id && enquiry?.product_id.productname}</b></ListGroup.Item>
                  <ListGroup.Item>Quantity - <b>{enquiry && enquiry.quantity}</b></ListGroup.Item>
               </ListGroup>
            </Card>
            <Link to={`/quotationview/${eid}`}><Button>view quotation</Button></Link>
         </div>
      </div>
   )
}
