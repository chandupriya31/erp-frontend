import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Card, Row, Col, Carousel,Button } from "react-bootstrap";
import "../../index.css"

function Products() {
    const navigate = useNavigate()
    const { state } = useLocation();
    console.log(state);
    const { userState } = useContext(UserContext);
    console.log(userState, "prod");
    const company = userState.companylist.find((ele) => ele._id === state);
    console.log(company.products, "company data");

    const handleClick = ()=>{
        
    }

    return (
        <div>
            <Link to={`/company-website/${state}`}>Home</Link>
            <h2>Products Page</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {company &&
                company.products &&
                company.products.map((ele) => (
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
                        <Button variant="primary" onClick={handleClick}>About product</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Products;
