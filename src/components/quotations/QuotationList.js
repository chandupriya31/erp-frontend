import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { QuotationItem } from './QuotationItem'
import { startGetSortedData } from '../../actions/quotation-action'

export function QuotationList(props) {
  const dispatch = useDispatch()
  const quotesData = useSelector((state) => state.quotation.list)
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    dispatch(startGetSortedData(sortOrder))
  }, [dispatch, sortOrder])

  const handleSortChange = (e) => {
    const order = e.target.value
    setSortOrder(order)
    dispatch(startGetSortedData(order))
  };

  return (
    <div>
      {quotesData.length === 0 ? 'No quotations yet' : (
        <div>
          <h1>Quotationlist - {quotesData.length}</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Date
                  <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value=''>select</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </th>
                <th>EnquiryId</th>
                <th>Quotation Expiry Date</th>
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
              {quotesData.map((ele) => (
                <QuotationItem key={ele._id} ele={ele} />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}