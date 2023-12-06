import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import { UserContext } from "../../App"
import { useContext } from "react"
import { Link } from 'react-router-dom';

export default function Myorders() {
   const { userState } = useContext(UserContext)
   console.log(userState.user, 'mo')
   const orders = userState.user.myOrders
   console.log(orders, 'o')
   return (
      <div style={{ height: '100vh', backgroundImage: 'url(https://erp-project.s3.ap-south-1.amazonaws.com/bg1.jpg)' }}>
         <h1>MyOrders-{userState.user.myOrders?.length}</h1>
         <Card style={{ width: '30rem' }} className='p-3 mb-2 bg-primary-subtle text-emphasis-primary' >
            {orders?.map((ele, i) => {
               return <Link className="text-decoration-none" to={`/order/${ele._id}`}>
                  <Card.Body>
                     <ListGroup style={{ width: '400px', fontSize: '20px' }}>
                        <div className='d-flex center'>
                           {i + 1}
                           <ListGroup.Item action className='text-primary'>
                              {ele.company?.companyname}-{ele.productId?.productname}
                           </ListGroup.Item>
                        </div>
                     </ListGroup>
                  </Card.Body>
               </Link>
            })}
         </Card>
      </div>
   )
}