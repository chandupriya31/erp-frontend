import { useParams } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../App"
import Card from 'react-bootstrap/Card'
import Table from "react-bootstrap/Table"

export default function MyorderItem() {
   const { userState } = useContext(UserContext)
   const params = useParams()
   const { id } = params
   const order = userState.user?.my_orders?.find(ele => ele._id === id)
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
                              {order?.quotation_id?._id}
                           </td>
                        </tr>
                        <tr>
                           <td class="fw-normal"><br />company name</td>
                           <td className="fw-bold">{order?.company?.companyname}<br />
                           </td>
                        </tr>
                        <tr>
                           <td class="fw-normal">productname</td>
                           <td className="fw-bold">{order?.product_id?.productname}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">quantity</td>
                           <td className="fw-bold">{order?.quotation_id?.quantity}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">cost per unit</td>
                           <td className="fw-bold">{order?.quotation_id?.unit_price}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">total cost</td>
                           <td className="fw-bold">{order?.quotation_id?.total_cost}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">deliverydate</td>
                           <td className="fw-bold">{new Date(order?.delivery_date).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">product warrenty</td>
                           <td className="fw-bold">{order?.product_id?.product_warranty}</td>
                        </tr>
                        <tr>
                           <td class="fw-normal">Payment transactionId</td>
                           <td className="fw-bold">{order?.transaction_id}</td>
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