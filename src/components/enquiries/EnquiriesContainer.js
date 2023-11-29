import { useContext } from "react";
import { UserContext } from "../../App";
import { EnquiresList } from "./EnquiresList";
export default function Enquires() {
   const { userState } = useContext(UserContext);
   const enquiries = userState.company.enquiries

   return (
      <div>
         <EnquiresList enquiries={enquiries} />
      </div>
   )
}