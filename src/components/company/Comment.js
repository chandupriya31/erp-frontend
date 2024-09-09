import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { startAddComment } from "../../actions/quotation-action";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Comment(props) {
    const { quotation } = props;
    const quotations = useSelector((state) => state.quotation.list);
    const quoteComments = quotations.find(ele => ele._id === quotation);
    const dispatch = useDispatch();
    const { userState } = useContext(UserContext);
    const [content, setContent] = useState('');
    const [formErrors, setFormErrors] = useState({})

    const runValidations = () => {
        const errors = {}
        if (content.length === 0) {
            errors.content = '*Message cannot be empty'
        }
        setFormErrors(errors)
        return errors
    }

    const handleClick = (e) => {
        e.preventDefault()
        const errors = runValidations()
        if (Object.keys(errors).length === 0) {
            const formData = {
                quotation_id: quotation,
                content
            };
            dispatch(startAddComment(formData));
            setContent('');
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {userState.user.role === 'companyAdmin' ? 'Reply to your customer: ' : 'Leave a message: '}
                </Card.Title>
                <Row>
                    <Col xs={12} md={8}>
                        <Form.Group controlId="commentTextarea">
                            <Form.Control
                                as="textarea"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Leave a message"
                            />
                        </Form.Group>
                        {formErrors.content && <b style={{ color: 'red' }}>{formErrors.content}</b>}
                    </Col>
                    <Col xs={12} md={1} className="text-md-left text-center mt-md-0 mt-2">
                        <Button onClick={handleClick} variant="primary">
                            {userState.user.role === 'companyAdmin' ? 'Reply' : 'Send'}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Comment;
