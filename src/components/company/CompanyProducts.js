import { useDispatch, useSelector } from "react-redux"
import { Card, Row, Col, Carousel,Button } from "react-bootstrap"
import { startDeleteProduct } from "../../actions/productactionCltr"
import {Link} from 'react-router-dom'

function CompanyProducts(){
    const dispatch = useDispatch()
    const products = useSelector((state)=>{
        return state.product?.data
    })
    const handleDelete = (id)=>{
        dispatch(startDeleteProduct(id))
    }

    console.log(products)
    return (
        <div>
            {products.length === 0 ?(
                <p>no products <Link to ="/addproduct"><b style={{color:"blueviolet"}}>Add your products</b></Link></p>
            ):(
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
                                <Card.Text>
                                    {ele.description}
                                </Card.Text>
                                <Button variant="danger" onClick={()=>handleDelete(ele._id)}>Delete product</Button>
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

export default CompanyProducts