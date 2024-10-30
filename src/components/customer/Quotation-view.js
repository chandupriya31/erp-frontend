import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../App"
import Button from 'react-bootstrap/Button'
import axios from "../../config/axios"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { startEditQuote, startGetComments, startSetQuotation } from "../../actions/quotation-action"
import Comment from "../company/Comment"

export default function Quotationview() {
   const [commentView, setCommentView] = useState(false)
   const dispatch = useDispatch()
   const [totalCost, setTotalCost] = useState('')
   const navigate = useNavigate()
   const params = useParams()
   const { id } = params
   const { userState } = useContext(UserContext)
   console.log(userState, 'user')

   const quote = useSelector((state) => {
      return state?.quotation?.list
   })

   const comments = useSelector((state) => {
      return state?.quotation?.commentsList
   })
   console.log(comments, 'com')
   const quotation = quote.find((ele) => {
      return ele?.enquiry?._id === id
   })

   useEffect(() => {
      (async () => {
         dispatch(startSetQuotation())
         // dispatch(startGetComments(quotation?._id))
      })()
   }, [])

   console.log('quote1', quote)

   const handleCostChange = (id) => {
      const formData = {
         totalCost: Number(totalCost)
      }
      dispatch(startEditQuote(id, formData))
      setTotalCost('')
   }
   const handleViewComments = (id) => {
      setCommentView(!commentView)
      dispatch(startGetComments(id))
   }
   // const quotation = userState.user?.myQuotations
   //    ?.find((ele) => ele.enquiry._id === id)
   // console.log(quotation.product, 'qv')

   localStorage.setItem('enquiry', quotation?.enquiry?._id)

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
                              <td className="fw-bold">{quotation.company?.companyname}<br />
                                 address-{quotation.company?.contactdetails?.address?.name}
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
                              <td className="fw-bold">{quotation.product?.productname}</td>
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
                              <td className="fw-bold">{quotation?.totalCost}<br />{userState.user.role === 'companyAdmin' && (<div>
                                 <input
                                    type="number"
                                    value={totalCost}
                                    onChange={e => setTotalCost(e.target.value)}
                                 /><Button onClick={() => handleCostChange(quotation._id)} disabled={isApproved === true}>Update cost</Button>
                              </div>)}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">product warrenty</td>
                              <td className="fw-bold">{quotation.product?.productWarranty}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">delivery duration</td>
                              <td className="fw-bold">{quotation.termsandconditions?.delivery}</td>
                           </tr>
                           <tr>
                              <td class="fw-normal">payment terms</td>
                              <td className="fw-bold">{quotation.product?.paymentTerms}</td>
                           </tr>
                        </tbody>
                     </Table>
                  </div>
                  <Button onClick={() => handleViewComments(quotation._id)}>
                     {commentView ? 'Hide messages' : 'View messages'}
                  </Button>
                  {commentView && (comments ? (
                     <div className="mt-3">
                        {comments.map(ele => (
                           <div key={ele._id} className="mb-2">
                              <strong>{ele?.userId?.username}:</strong> {ele.content}
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="mt-3">No messages yet... begin your chat</p>
                  ))}
                  {isApproved ? '' : <Comment quotation={quotation._id} />}
                  {userState.user.role === 'customer' &&
                     <div>
                        <label>agreed</label>
                        <input class="form-check-input" type="checkbox" checked={isApproved}
                           onChange={handleChange}
                           disabled={isApproved === true}
                           id="flexCheckChecked" />
                        <Button variant="primary" disabled={!isApproved} onClick={handleClick}>Move to payment</Button>
                     </div>
                  }
               </Card.Body>
            </Card>
         ) : (
            <p>no quotation for this enquiry</p>
         )}
      </div>
   )
}
