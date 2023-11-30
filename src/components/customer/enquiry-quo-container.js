import { UserContext } from "../../App"
import { useContext } from "react"
import Myenquires from "./Myenquiries"

export default function Customercontainer() {
   const { userState } = useContext(UserContext)
   const enquires = userState.user
   return (
      <div>
         <Myenquires enquiries={enquires} />
      </div>
   )
}