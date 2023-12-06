import { useParams } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../App"
import Card from 'react-bootstrap/Card'
import Table from "react-bootstrap/Table"

export default function MyorderItem() {
   const { userState } = useContext(UserContext)
   const params = useParams()
   const { id } = params
   const order = userState.user?.myOrders?.find(ele => ele._id === id)
   console.log(order)

   return (
      <div className="d-flex justify-content-center mt-5">
         <Card className="text-center w-75 p-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded" >
            <Card.Header className="fs-2">OrderAcceptance
               <div style={{ marginLeft: '700px', fontSize: '20px' }}>date-{new Date(order?.date).toLocaleDateString()}</div>
            </Card.Header>
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
                              {order?.quotationId?._id}
                           </td>
                        </tr>
                        <tr>
                           <td class="fw-normal"><br />company name</td>
                           <td className="fw-bold">{order?.company?.companyname}<br />
                           </td>
                        </tr>
                        <tr>
                           <td class="fw-normal">productname</td>
                           <td className="fw-bold">{order?.productId?.productname}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">quantity</td>
                           <td className="fw-bold">{order?.quotationId?.quantity}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">cost per unit</td>
                           <td className="fw-bold">{order?.quotationId?.unitPrice}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">total cost</td>
                           <td className="fw-bold">{order?.quotationId?.totalCost}</td>
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
                           <td class="fw-normal">Payment transactionId</td>
                           <td className="fw-bold">{order?.transactionId}</td>
                        </tr>
                        <tr>
                        </tr>
                     </tbody>
                  </Table>
               </div>
            </Card.Body>
         </Card>
      </div>
   )
}