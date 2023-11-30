import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"

export default function Enquirylist({ enquiries }) {
   const { userState } = useContext(UserContext)
   const { id } = useParams()

   const enquiry = userState.user?.myenquiries?.find((ele) => ele.productId.companyId === id
   )

console.log(enquiry,'li')
   console.log(enquiry?.productId)
   return (
      <div>
         <h1>Enquiry List</h1>

      </div>
   )
}
