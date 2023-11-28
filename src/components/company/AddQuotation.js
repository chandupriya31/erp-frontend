import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Form from 'react-bootstrap/Form'
import { startAddQuotation } from "../../actions/quotation-action"
import { clearServer } from "../../actions/quotation-action"
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Button from 'react-bootstrap/Button'
function AddQuotation(props) {
    const { ele } = props
    const { _id, productId, quantity, customerId } = ele
    const dispatch = useDispatch()
    const [enquiryId, setEnquiryId] = useState(_id ? _id : '')
    const [product, setProductname] = useState(productId.productname ? productId.productname : '')
    const [Quantity, setQuantity] = useState(quantity ? quantity : '')
    const [unitPrice, setUnitPrice] = useState('')
    const [total, setTotal] = useState('')
    const [quotationExpiry, setQuotationExpiry] = useState('')
    const [deliveryduration, setDeliveryDuration] = useState('')
    const [showToast, setShowToast] = useState(true)

    const serverErrors = useSelector((state) => {
        return state.quotation.quserverErrors
    })

    console.log(serverErrors, 'quo')

    const calculateTotal = () => {
        const totalCost = unitPrice * Quantity
        setTotal(totalCost)
    }
    const handleClose = () => {
        setShowToast(false)
        dispatch(clearServer([]))
    }
    useEffect(() => {
        calculateTotal()
    }, [unitPrice, Quantity])

    function handleSubmit() {
        const formData = {
            enquiry: enquiryId,
            customer: customerId,
            product: productId._id,
            quantity: Quantity,
            unitPrice: Number(unitPrice),
            totalCost: total,
            quotationExpiry,
            termsandconditions: {
                delivery: deliveryduration
            },
        }
        dispatch(startAddQuotation(formData))
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>EnquiyId</Form.Label>
                    <Form.Control type="text" readOnly value={enquiryId} onChange={(e) => { setEnquiryId(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>product name</Form.Label>
                    <Form.Control type="text" readOnly value={product} onChange={(e) => { setProductname(e.target.value) }} />
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" readOnly value={Quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                    <Form.Label>per unit cost</Form.Label>
                    <Form.Control
                        type="number"
                        value={unitPrice}
                        onChange={(e) => {
                            setUnitPrice(e.target.value)
                            calculateTotal()
                        }}
                    />
                    <Form.Label>totalCost</Form.Label>
                    <Form.Control type="number" value={total} onChange={(e) => { setTotal(e.target.value) }} />
                    <Form.Label>quotationExpiry</Form.Label>
                    <Form.Control type="date" value={quotationExpiry} onChange={(e) => { setQuotationExpiry(e.target.value) }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>terms and conditions:</b></Form.Label>
                </Form.Group>
                <Form.Label>
                    <Form.Label>delivery duration</Form.Label>
                    <Form.Control as='textarea' value={deliveryduration} onChange={(e) => { setDeliveryDuration(e.target.value) }}> </Form.Control>
                </Form.Label>
            </Form>
            <div className="d-flex justify-content-end mt-3">
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
                <Button className="ms-4" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <div>
                {(serverErrors && serverErrors.length > 0) && showToast && (
                    <ToastContainer position='top-center'>
                        <Toast show={showToast} onClose={handleClose} animation={true} bg='warning'>
                            {/* Toast header and body */}
                            <Toast.Header closeButton={true}>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">Server Errors</strong>
                                <small className="text-muted">just now</small>
                            </Toast.Header>
                            {serverErrors.map((ele, index) => (
                                <Toast.Body key={index}>{ele.msg}</Toast.Body>
                            ))}
                        </Toast>
                    </ToastContainer>
                )}
            </div>
        </div>
    )
}

export default AddQuotation