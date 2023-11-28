import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap';
import AddQuotation from './AddQuotation';
export function EnquiresItem(props) {
   const [lgShow, setLgShow] = useState(false)
   const { ele } = props;
   const { customerId, productId, date, quantity } = ele;
   console.log(props.ele)
   console.log(productId, 'item');



   return (
      <tr>
         <td>{productId.productname}</td>
         <td>{customerId.username}</td>
         <td>{quantity}</td>
         <td>{new Date(date).toLocaleDateString()}</td>
         <td><Button variant="primary" onClick={() => setLgShow(true)} >send quotation</Button></td>
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
                     <AddQuotation ele={ele} customerId={customerId._id} onClose={() => setLgShow(false)} />
                  </Modal.Body>
               </Modal>
            )}
         </div>
      </tr>
   )
}
