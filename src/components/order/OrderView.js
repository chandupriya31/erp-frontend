import { useSelector } from "react-redux/es/hooks/useSelector"
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Table from "react-bootstrap/Table"
import { useEffect, useContext, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { startEdit } from "../../actions/order-action"
import { getOrderList } from "../../actions/order-action"
import { UserContext } from "../../App"

export default function Orderview() {
   const [status, setstatus] = useState('')
   const {userState} = useContext(UserContext)
   const dispatch = useDispatch()
   const params = useParams()
   const { id } = params
   console.log(id, 'id')

   const order = useSelector((state) => {
      return state.order.order.find(ele => ele._id === id)
   })
   console.log(order)

   const product = order?.customerId?.myQuotations?.find(ele => ele._id == order.quotationId)
   console.log(product)

   const handleClick = async () => {
      try {
         dispatch(startEdit(order?._id, status))
         // localStorage.setItem('status', status) // Save 'status' in localStorage
         setstatus('')
      } catch (error) {
         console.error('Error updating status:', error)
      }
   }

   useEffect(() => {
      // const storedStatus = localStorage.getItem('status')
      // if (storedStatus) {
      //    setstatus(storedStatus)
      // }
      dispatch(getOrderList())
   }, [])

   return (
      <div className="d-flex justify-content-center mt-5">
         <Card className="text-center w-75 p-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded" >
            <Card.Header className="fs-2">OrderAcceptance</Card.Header>
            <Card.Body>
               <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Table striped bordered >
                     <colgroup>
                        <col />
                        <col />
                     </colgroup>
                     <tbody>
                        <tr>
                           <td class="fw-normal">orderId<br />
                              quotataionId<br />
                           </td>
                           <td className="fw-bold">{order?._id}<br />
                              {order?.quotationId}
                           </td>
                        </tr>
                        <tr>
                           <td class="fw-normal"><br />customer name</td>
                           <td className="fw-bold">{order?.customerId?.username}<br />
                           </td>
                        </tr>
                        <tr>
                           <td class="fw-normal">productname</td>
                           <td className="fw-bold">{order?.productId?.productname}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">quantity</td>
                           <td className="fw-bold">{product?.quantity}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">cost per unit</td>
                           <td className="fw-bold">{product?.unitPrice}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">total cost</td>
                           <td className="fw-bold">{product?.totalCost}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">deliverydate</td>
                           <td className="fw-bold">{new Date(order?.deliveryDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">product warrenty</td>
                           <td className="fw-bold">{order?.productId?.productWarranty}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">payment terms</td>
                           <td className="fw-bold">{order?.productId?.paymentTerms}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">transactionId</td>
                           <td className="fw-bold">{order?.transactionId}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">status of Product</td>
                           <td className="fw-bold">{order?.statusofProduct}<br />{userState.user.role=== 'companyAdmin' &&
                              <div>
                                 <input type="text" value={status} onChange={(e) => { setstatus(e.target.value) }} />
                                 <Button onClick={handleClick} disabled={order?.statusofProduct == 'delivered'}>update</Button>
                              </div>}
                           </td>
                        </tr>
                     </tbody>
                  </Table>
               </div>
            </Card.Body>
         </Card>

      </div >
   )
}