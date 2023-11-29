import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ListGroup from 'react-bootstrap/ListGroup'
import { startGetCategory } from "../../actions/productactionCltr"
export default function Categories() {
   const dispatch = useDispatch()
   const categories = useSelector((state) => {
      return state.product.categories
   })
   console.log(categories, 'cat')

   useEffect(() => {
      dispatch(startGetCategory())
   }, [])

   function handleClick() {

   }
   return (
      <div >
         <h1>categories</h1>
         <ListGroup as="ul" style={{ width: '200px' }}>
            {categories.map((ele) => {
               return <ListGroup.Item as="li" action  onClick={() => { handleClick(ele._id) }}>
                  {ele.name}
               </ListGroup.Item>
            })}

         </ListGroup>
      </div>
   )
}