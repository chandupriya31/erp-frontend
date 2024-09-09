import { useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, Row, Col, Carousel, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import _ from "lodash"
import { startGetProduct } from "../../actions/productactionCltr"
import { UserContext } from "../../App"

function AllProducts() {
  const { userState } = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state) => {
    return state.product?.data?.products
  })

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(startGetProduct())
  }, [dispatch])

  const handleView = (id) => {
    _.isEmpty(userState.user) ? navigate("/login") : navigate(`/product/${id}`)
  }

  // const pageSize = 6
  // const totalProducts = products.length
  // const totalPages = Math.ceil(totalProducts / pageSize)

  // const paginatedProducts = products.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // )

  return (
    <div>
      {products?.length > 0 && (
        <div style={{ margin: 'auto', maxWidth: '1000px', marginBottom: '200px' }}>
          <h3>Products</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map((ele) => (
              <Col key={ele._id} xs={12} sm={6} md={4} lg={3}>
                <Card style={{ width: "100%", marginBottom: "20px" }}>
                  <Carousel>
                    {ele?.image &&
                      ele?.image.map((ele1) => (
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
                    <Card.Title>{ele?.productname}</Card.Title>
                    <Button
                      variant="success"
                      onClick={() => handleView(ele?._id)}
                    >
                      About product
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* <div className="pagination-container">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "primary" : "light"}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
