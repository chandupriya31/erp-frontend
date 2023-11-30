import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"
export default function Quotationview() {
   const params = useParams()
   const { id } = params
   const { userState } = useContext(UserContext)
   const quotation = userState.user?.myQuotations
      ?.find((ele) => ele.enquiry._id === id
      )
   console.log(quotation, 'quo-view')

   return (
      <div>
         <h1>quotation</h1>
      </div>
   )
}