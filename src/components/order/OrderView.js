import { useSelector } from "react-redux/es/hooks/useSelector"
import { useParams } from "react-router-dom"
export default function Orderview() {
   const params = useParams()
   const { id } = params
   console.log(id, 'id')
   const order = useSelector((state) => {
      return state.order.order.find(ele => ele._id === id)
   })
   console.log(order)
   return (
      <div>
         <h1>order view</h1>
      </div>
   )
}