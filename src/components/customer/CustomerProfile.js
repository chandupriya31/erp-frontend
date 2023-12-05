import { useContext, useState } from "react"
import { UserContext } from "../../App"
import axios from "../../config/axios"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ListGroup } from "react-bootstrap";
function CustomerProfile() {
    const { userState, userDispatch } = useContext(UserContext)
    console.log('user', userState.user)
    const [edit,setEdit] = useState(false)
    const user = userState.user
    console.log(user)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const handleChange = async (e) => {
        setEdit(!edit)
        e.preventDefault()
        const formData = {
            username,
            email
        }
        try {
            const response = await axios.put('/api/user/update', formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            userDispatch({ type: 'UPDATE_USER', payload: response.data })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div style={{ width: '600px' }} className="mx-auto p-5">
            <Card>
                <Card.Header as="h5">Profile</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Username
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={edit===false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={edit===false}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <ListGroup>
                        <ListGroup.Item>Your role - <b>{user.role}</b></ListGroup.Item>
                        <ListGroup.Item>Total Enquiries - <b>{user.myenquiries && user.myenquiries.length}</b></ListGroup.Item>
                        <ListGroup.Item>Total Quotations - <b>{user.myQuotations && user.myQuotations.length}</b></ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div class="mx-auto p-2">
                    <Button variant="primary" onClick={handleChange}>{edit ? 'save' : 'edit'}</Button>
                </div>
            </Card>
        </div>
    )
}

export default CustomerProfile