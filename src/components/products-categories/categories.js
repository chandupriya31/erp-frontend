import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Accordion from 'react-bootstrap/Accordion'
import { startGetCategory, startGetCatProduct } from "../../actions/productactionCltr"
import { Button, Row, Col } from "react-bootstrap"

export default function Categories() {
   const { state } = useLocation()
   console.log(state)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const categories = useSelector((state) => {
      return state.product.categories
   })
   console.log(categories, 'cat')

   const product = useSelector((state) => {
      return state.product.catpro
   })
   console.log(product, 'cp')

   useEffect(() => {
      dispatch(startGetCategory())
   }, [])

   function handleClick(id) {
      dispatch(startGetCatProduct(id))

   }
   const handleBack = ()=>{
      navigate(`/company-website/${state}`)
   }
   return (
      <div>
         <button onClick={handleBack}>Back to Company</button>
         <h1 className="mt-5 mb-4 text-center ">Products Based on category</h1>
         <Accordion defaultActiveKey="0">
            {categories.map((ele) => (
               <Accordion.Item eventKey={ele._id} key={ele._id}>
                  <Accordion.Header onClick={() => { handleClick(ele._id) }}>
                     <div className="text-center fs-4">{ele.name}</div>
                  </Accordion.Header>
                  <Accordion.Body class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                     <Row>
                        {product.length > 0 && ele._id === product[0].categoryId._id ? (
                           product.map((item) => (
                              <Col key={item._id} md={4} className="mb-4">
                                 <div>
                                    {item.image && item.image.length > 0 && (
                                       <img src={item.image[0].url} class="object-fit-cover border rounded" style={{ height: '150px', width: '200px' }} alt={item.productname} className="mr-3" />
                                    )}
                                    <div>
                                       <b>Product Name:</b> {item.productname}<br />
                                       <b>Description:</b> {item.description}<br />
                                       <Link to={`/product/${item._id}`}>                                       <Button variant="outline-info" className="mt-2"
                                       >More...</Button></Link>
                                    </div>
                                 </div>
                              </Col>
                           ))
                        ) : (
                           <Col>
                              <div>No products available</div>
                           </Col>
                        )}
                     </Row>
                  </Accordion.Body>
               </Accordion.Item>
            ))}
         </Accordion>
      </div >
   )
}