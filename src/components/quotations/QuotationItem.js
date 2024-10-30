import { Checkmark } from 'react-checkmark'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { startGetorder, getOrderList } from '../../actions/order-action';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function QuotationItem(props) {
   const { ele } = props
   const dispatch = useDispatch()
   console.log(ele, 'quotation-item')
   const [productstatus, setProductStatus] = useState('')
   const [date, setDate] = useState('')
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const order = useSelector((state) => {
      return state.order.order.find(e => e.quotationId === ele._id)
   })
   console.log(order, 'order')

   useEffect(() => {
      dispatch(getOrderList())
   }, [])

   function handleClick() {
      const formData = {
         quotationId: ele._id,
         deliveryDate: date,
         statusofProduct: productstatus
      }
      dispatch(startGetorder(formData))
      console.log(formData)
   }
   return (
      <tr className='text-center mt-3'>
         <td>{new Date(ele.date).toLocaleDateString()}</td>
         <td>{ele.enquiry._id}</td>
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
               {order && order.quotationId === ele._id ? <Link to={`/orderview/${order._id}`} ><Button>view</Button></Link> : <Button variant="primary" onClick={handleShow}>create order</Button>}
               <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Form.Label htmlFor="inputPassword5">quotationId</Form.Label>
                     <Form.Control
                        type="text"
                        disabled
                        value={ele._id}
                     />
                     <Form.Label htmlFor="inputPassword5">deliveryDate</Form.Label>
                     <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                     />
                     <Form.Label htmlFor="inputPassword5">status of product</Form.Label>
                     <Form.Control
                        type="text"
                        value={productstatus}
                        onChange={(e) => { setProductStatus(e.target.value) }}
                     />
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        Close
                     </Button>
                     <Button variant="primary" onClick={handleClick}>
                        submit
                     </Button>
                  </Modal.Footer>
               </Modal>
            </div>
         ) :
            ('pending')}</td>
      </tr>
   )
}  
