import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"
import Button from 'react-bootstrap/Button'
import axios from "../../config/axios"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

export default function Quotationview() {
   const params = useParams()
   const { id } = params
   const { userState } = useContext(UserContext)

   const quotation = userState.user?.myQuotations
      ?.find((ele) => ele.enquiry._id === id)
   console.log(quotation, 'qv')

   const [isApproved, setIsApproved] = useState(quotation?.termsandconditions?.isApproved)

   console.log(isApproved,'app')

   const handleChange = async (event) => {
      const newValue = event.target.checked
      setIsApproved(newValue)
      try {
         await axios.put(`/api/quotation/isapproved/${quotation?._id}`, { isApproved: newValue })
      } catch (error) {
         console.error('Error updating isApproved:', error)
      }
   }


   return (
      <div>
         {quotation && quotation._id ? (
            <Card className="text-center">
               <Card.Header className="fs-2">Quotation</Card.Header>
               <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <Table striped bordered >
                        <colgroup>
                           <col />
                           <col />
                        </colgroup>
                        <tbody>
                           <tr>
                              <td>company name <br />address</td>
                              <td className="fw-bold">{quotation.enquiry?.company?.companyname}<br />
                                 address-{quotation.enquiry?.company?.contactdetails?.address?.name}
                              </td>
                           </tr>
                           <tr>
                              <td>quotationId</td>
                              <td className="fw-bold">{quotation && quotation._id}</td>
                           </tr>
                           <tr>
                              <td>enquiryId</td>
                              <td className="fw-bold">{quotation.enquiry && quotation.enquiry._id}</td>
                           </tr>
                           <tr>
                              <td>quotation Date</td>
                              <td className="fw-bold">{new Date(quotation.date).toLocaleDateString()}</td>
                           </tr>
                           <tr>
                              <td>quotationExpiry</td>
                              <td className="fw-bold">{new Date(quotation.quotationExpiry).toLocaleDateString()}</td>
                           </tr>
                           <tr>
                              <td>product name</td>
                              <td className="fw-bold">{quotation.enquiry?.productId?.productname}</td>

                           </tr>
                           <tr>
                              <td>quantity</td>
                              <td className="fw-bold">{quotation?.quantity}</td>
                           </tr>
                           <tr>
                              <td>per unit cost</td>
                              <td className="fw-bold">{quotation?.unitPrice}</td>
                           </tr>
                           <tr>
                              <td>total price</td>
                              <td className="fw-bold">{quotation?.totalCost}</td>
                           </tr>
                           <tr>
                              <td>product warrenty</td>
                              <td className="fw-bold">{quotation.enquiry?.productId?.productWarranty}</td>
                           </tr>
                           <tr>
                              <td>delivery duration</td>
                              <td className="fw-bold">{quotation.termsandconditions?.delivery}</td>
                           </tr>
                           <tr>
                              <td>payment terms</td>
                              <td className="fw-bold">{quotation.enquiry?.productId?.paymentTerms}</td>
                           </tr>
                        </tbody>
                     </Table>
                  </div>
                  <div>
                     <label>agreed</label>
                     <input class="form-check-input" type="checkbox" checked={isApproved}
                        onChange={handleChange}
                        id="flexCheckChecked" />
                  </div>
                  <Button variant="primary">Go somewhere</Button>
               </Card.Body>
            </Card>
         ) : (
            <p>no quotation for this enquiry</p>
         )}
      </div>
   )
}
