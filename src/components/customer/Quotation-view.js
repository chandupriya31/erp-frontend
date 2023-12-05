import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../App"
import Button from 'react-bootstrap/Button'
import axios from "../../config/axios"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import _ from 'lodash'

export default function Quotationview() {
   const navigate = useNavigate()
   const params = useParams()
   const { id } = params
   const { userState } = useContext(UserContext)
   console.log(userState, 'user')

   const quotation = userState.user?.myQuotations
      ?.find((ele) => ele.enquiry._id === id)
   console.log(quotation, 'qv')
   localStorage.setItem('enquiry',quotation?.enquiry._id)


   const [isApproved, setIsApproved] = useState(quotation?.termsandconditions?.isApproved)

   console.log(isApproved, 'isapprove')

   const handleChange = async (event) => {
      const newValue = event.target.checked
      setIsApproved(newValue)
      try {
         await axios.put(`/api/quotation/isapproved/${quotation?._id}`, { isApproved: newValue })
      } catch (error) {
         console.error('Error updating isApproved:', error)
      }
   }

   const handleClick = () => {
      navigate('/payment-details', { state: quotation._id })
   }


   return (
      <div className="d-flex justify-content-center pt-5">
         {quotation && quotation._id ? (
            <Card className="text-center w-75 p-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded" >
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
                              <td class="fw-normal">company name <br />address</td>
                              <td className="fw-bold">{quotation.enquiry?.company?.companyname}<br />
                                 address-{quotation.enquiry?.company?.contactdetails?.address?.name}
                              </td>
                           </tr>
                           <tr>
                              <td class="fw-normal">quotationId</td>
                              <td className="fw-bold">{quotation && quotation._id}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">enquiryId</td>
                              <td className="fw-bold">{quotation.enquiry && quotation.enquiry._id}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">quotation Date</td>
                              <td className="fw-bold">{new Date(quotation.date).toLocaleDateString()}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">quotationExpiry</td>
                              <td className="fw-bold">{new Date(quotation.quotationExpiry).toLocaleDateString()}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">product name</td>
                              <td className="fw-bold">{quotation.enquiry?.productId?.productname}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">quantity</td>
                              <td className="fw-bold">{quotation?.quantity}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">per unit cost</td>
                              <td className="fw-bold">{quotation?.unitPrice}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">total price</td>
                              <td className="fw-bold">{quotation?.totalCost}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">product warrenty</td>
                              <td className="fw-bold">{quotation.enquiry?.productId?.productWarranty}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">delivery duration</td>
                              <td className="fw-bold">{quotation.termsandconditions?.delivery}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">payment terms</td>
                              <td className="fw-bold">{quotation.enquiry?.productId?.paymentTerms}</td>
                           </tr>
                        </tbody>
                     </Table>
                  </div>
                  {userState.user.role==='customer' ? 
                     <div>
                        <label>agreed</label>
                        <input class="form-check-input" type="checkbox" checked={isApproved}
                           onChange={handleChange}
                           id="flexCheckChecked" />
                           <Button variant="primary" disabled={!isApproved} onClick={handleClick}>Move to payment</Button>
                     </div>
                  :<Button>Edit</Button>}
               </Card.Body>
            </Card>
         ) : (
            <p>no quotation for this enquiry</p>
         )}
      </div>
   )
}
