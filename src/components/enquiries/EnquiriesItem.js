import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap';
import AddQuotation from '../quotations/AddQuotation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom';

export function EnquiresItem(props) {
   const quotation = useSelector(state =>{
      return state.quotation.List
   })
   const navigate = useNavigate()
   console.log(quotation,'quote')
   const [lgShow, setLgShow] = useState(false)
   const { enquiry } = props;
   console.log(enquiry,'ele')
   const { customerId, productId, date, quantity } = enquiry
   // console.log(props.ele,'enquiry')
   const present = quotation.find(ele1 => ele1.enquiry === enquiry._id)
   // console.log(present,'present')
   // // console.log(present.enquiry)
   // const id = present.enquiry
   // console.log(id)
   // // console.log(productId, 'item');
   const handleViewQuotation = (id)=>{
      console.log(id)
      navigate(`/quotationview/${id}`)
   }

   return (
      <tr>
         <td>{productId.productname}</td>
         <td>{customerId.username}</td>
         <td>{quantity}</td>
         <td>{new Date(date).toLocaleDateString()}</td>
         <td>{present ? <Button  variant="primary" onClick={()=>handleViewQuotation(present.enquiry)}>View quotation</Button>:<Button variant="primary" onClick={() => setLgShow(true)} >send quotation</Button>}</td>
         {/* <td><Button variant="primary" onClick={() => setLgShow(true)} >send quotation</Button></td> */}
      <tr />
         <div>
            {lgShow && (
               <Modal
                  size="lg"
                  show={lgShow}
                  onHide={() => setLgShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
               >
                  <Modal.Header closeButton>
                     <Modal.Title id="example-modal-sizes-title-lg">
                        Quotation
                     </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <AddQuotation ele={enquiry} customerId={customerId._id} onClose={() => setLgShow(false)} />
                  </Modal.Body>
               </Modal>
            )}
         </div>
      </tr>
   )
}
