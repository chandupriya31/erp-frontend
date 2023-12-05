// import { useDispatch, useSelector } from "react-redux";
import { EnquiresItem } from "./EnquiriesItem";
import Table from 'react-bootstrap/Table'
// import { useEffect } from "react";
// import { startGetEnquiries } from "../../actions/enquiry-action";
export function EnquiresList(props) {
   // const dispatch = useDispatch()
   // const enquiries = useSelector(state =>{
   //    // return state
   //    return state?.enquires?.enquiryList
   // })
   const { enquiries } = props;
   console.log('new',enquiries)
   
   return (
      <div>
         <h1>Enquiry List</h1>
         {!enquiries || enquiries.length === 0 ? <div>No enquiries available</div> :
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th>Product name</th>
                     <th>customer name</th>
                     <th>Quantity</th>
                     <th>enquiry Date</th>
                     <th>quotataion</th>
                  </tr>
               </thead>
               <tbody>
                  {enquiries.map((ele) => (
                     <EnquiresItem key={ele._id} enquiry={ele} />
                  ))}
               </tbody>
            </Table>
         }
      </div>
   );
}
