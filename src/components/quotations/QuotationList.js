import Table from 'react-bootstrap/Table'
import { QuotationItem } from './QuotationItem'
import { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
export function QuotationList(props) {
   const { quotationList } = props
   const [sortedList, setSortedList] = useState([...quotationList])
   const [sortOrder, setSortOrder] = useState('asc')
   const [search, SetSearch] = useState('')
   console.log(quotationList, 'list-q')

   const sortByDate = (order) => {
      const sorted = [...sortedList].sort((a, b) => {
         const dateA = new Date(a.date)
         const dateB = new Date(b.date)
         return order === 'asc' ? dateA - dateB : dateB - dateA
      })
      setSortedList(sorted)
      setSortOrder(order)
   }
   useEffect(() => {
      sortQuotationsByDate(sortOrder)
   }, [quotationList, sortOrder])

   const sortQuotationsByDate = (order) => {
      const sorted = [...quotationList].sort((a, b) => {
         const dateA = new Date(a.quotationExpiry)
         const dateB = new Date(b.quotationExpiry)
         return order === 'asc' ? dateA - dateB : dateB - dateA
      })
      setSortedList(sorted)
   }

   const handleSortChange = (e) => {
      const order = e.target.value
      sortByDate(order)
   }
   const handleSearch = (e) => {
      const searchTerm = e.target.value
      SetSearch(searchTerm)
   }

   useEffect(() => {
      if (search) {
         axios.get(`http://localhost:7777/api/quotation/search?productName=${search}`, {
            headers: {
               Authorization: localStorage.getItem('token')
            }
         })
            .then(response => {
               console.log(response.data, 'search')
               if (response.data.length === 0) {
                  swal("product not found", "", "error")
                  SetSearch('')
               } else {
                  setSortedList(response.data)
               }
            })
            .catch(error => {
               console.error('Error fetching filtered data:', error)
            })
      } else {
         setSortedList([...quotationList])
      }
   }, [search, quotationList])



   return (
      <div>
         {quotationList.length === 0 ? 'No quotations yet' :
            <div>
               <h1>Quotationlist-{quotationList.length}</h1>
               <div style={{ marginLeft: '1000px', color: 'ButtonText' }}>
                  <input type='search' value={search} onChange={handleSearch} placeholder='search by product' /><br /><br />
               </div>
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
                        return <QuotationItem key={ele._id} ele={ele} />
                     })}
                  </tbody>
               </Table>
            </div>
         }
      </div>
   )
}