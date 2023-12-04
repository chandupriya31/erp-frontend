import { useEffect } from "react";
import { startGetEnquiries } from "../../actions/enquiry-action";
import { EnquiresList } from "./EnquiresList";
import { useDispatch, useSelector } from "react-redux";
export default function Enquires() {
   const dispatch = useDispatch()
   // const { userState } = useContext(UserContext);
   useEffect(()=>{
      dispatch(startGetEnquiries())
   },[])
   const enquiries = useSelector(state =>{
      return state?.enquiries?.enquiryList
   })

   console.log(enquiries,'welcome')

   return (
      <div>
         <EnquiresList enquiries={enquiries} />
      </div>
   )
}