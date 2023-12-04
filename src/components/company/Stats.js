import { useSelector } from "react-redux";
import { UserContext } from "../../App"
import { useContext } from "react"
export default function Stats() {
   const { userState } = useContext(UserContext);

   console.log(userState.company)

   return (
      <div>
         <h1>customers stats</h1>
      </div>
   )
}