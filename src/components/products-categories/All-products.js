import { useDispatch, useSelector } from "react-redux"
import { Card, Row, Col, Carousel,Button } from "react-bootstrap"
import {Link, useNavigate} from 'react-router-dom'
import _ from 'lodash'
import { getIndividualProduct } from "../../actions/productactionCltr"
import { useContext, useEffect } from "react"
import { UserContext } from "../../App"

function AllProducts(){
    const {userState} = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector((state)=>{
        return state.product?.data
    })

    const handleView = (id)=>{
        {_.isEmpty(userState.user) ? navigate('/login'):navigate(`/product/${id}`)}
    }

    console.log(products)
    return (
        <div>
            {products.length === 0 && (
                <div>
                    <h3>Products</h3>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products && products.map((ele) => (
                            <Col key={ele._id} xs={12} sm={6} md={4} lg={3}>
                            <Card style={{ width: "100%", marginBottom: "20px" }}>
                                <Carousel>
                                {ele.image &&
                                    ele.image.map((ele1) => (
                                    <Carousel.Item key={ele1._id}>
                                        <img
                                        className="d-block w-100 carousel-image"
                                        src={ele1.url}
                                        alt={ele1.key}
                                        />
                                    </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Card.Body>
                                <Card.Title>{ele.productname}</Card.Title>
                                {/* <Card.Text>
                                    {ele.description}
                                </Card.Text> */}
                                <Button variant="success" onClick={()=>handleView(ele._id)}>About product</Button>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    )
}

export default AllProducts