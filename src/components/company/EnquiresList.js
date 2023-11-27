
import { EnquiresItem } from "./EnquiriesItem";
import Table from 'react-bootstrap/Table'
export function EnquiresList(props) {
   const { enquiries } = props;
   console.log(enquiries, 'ies')
   return (
      <div>
         <h1>Enquiy List</h1>
         {!enquiries || enquiries.length === 0 ? <div>No enquiries available</div> :
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th>Product name</th>
                     <th>customer name</th>
                     <th>Quantity</th>
                     <th>enquiry Date</th>
                     <th>send quotataion</th>
                  </tr>
               </thead>
               <tbody>
                  {enquiries.map((ele, index) => (
                     <EnquiresItem key={index} ele={ele} />
                  ))}
               </tbody>
            </Table>
         }
      </div>
   );
}
