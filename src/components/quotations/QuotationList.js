import Table from 'react-bootstrap/Table'
import { QuotationItem } from './QuotationItem'
import { useState, useEffect } from 'react'
export function QuotationList(props) {
   const { quotationList } = props
   const [sortedList, setSortedList] = useState([...quotationList]);
   const [sortOrder, setSortOrder] = useState('asc')
   console.log(quotationList, 'list-q')

   const sortByDate = (order) => {
      const sorted = [...sortedList].sort((a, b) => {
         const dateA = new Date(a.date);
         const dateB = new Date(b.date);
         return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
      setSortedList(sorted);
      setSortOrder(order);
   }
   useEffect(() => {
      // Sort the list initially based on sortOrder and expiration date
      sortQuotationsByDate(sortOrder);
   }, [quotationList, sortOrder])

   const sortQuotationsByDate = (order) => {
      const sorted = [...quotationList].sort((a, b) => {
         const dateA = new Date(a.quotationExpiry);
         const dateB = new Date(b.quotationExpiry);
         return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
      setSortedList(sorted);
   }


   const handleSortChange = (e) => {
      const order = e.target.value;
      sortByDate(order);
   }
   return (
      <div>
         <h1>Quotationlist-{quotationList.length}</h1>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Date {<select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                     <option value=''>select</option>
                     <option value="asc">Ascending</option>
                     <option value="desc">Descending</option>
                  </select>}</th>
                  <th>EnquiryId</th>
                  <th>Quotation Exipry Date {<select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                     <option value="asc">Ascending</option>
                     <option value="desc">Descending</option>
                  </select>}</th>
                  <th>Customer name</th>
                  <th>Product name</th>
                  <th>Quantity</th>
                  <th>unitCost</th>
                  <th>Total Cost</th>
                  <th>terms and conditions</th>
                  <th>approved</th>
               </tr>
            </thead>
            <tbody>
               {sortedList.map((ele) => {
                  return <QuotationItem key={ele._id} ele={ele} />;
               })}
            </tbody>
         </Table>
      </div>
   )
}