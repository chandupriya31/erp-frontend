import { useContext } from "react";
import { UserContext } from "../../App";
import { BarChart, PieChart } from 'react-chartkick'
import { ColumnChart } from 'react-chartkick'
import 'chartkick/chart.js'

export default function Stats() {
   const { userState } = useContext(UserContext);
   console.log(userState.company);

   const customerTotals = {};

   userState.company?.orders?.forEach((ele) => {
      if (ele?.customer_id && ele?.quotation_id && ele.customer_id?._id === ele.quotation_id?.customer) {
         const customerId = ele.customer_id._id;
         const totalCost = ele.quotation_id.total_cost;

         if (!customerTotals[customerId]) {
            customerTotals[customerId] = totalCost;
         } else {
            customerTotals[customerId] += totalCost;
         }
      }
   });
   console.log(customerTotals);

   const chart = Object.entries(customerTotals).map(([customerId, totalCost]) => {
      const customerName = userState.company?.orders?.find(ele => ele.customer_id?._id === customerId)?.customer_id?.username || "Unknown";
      return [`name-${customerName}`, totalCost];
   });

   return (
      <div>
         <h1>Customers Stats</h1>
         <PieChart data={chart} />
         <div style={{ width: '500px', height: '500px' }}>
            <ColumnChart data={chart} />
            <BarChart data={chart} />
         </div>
      </div>
   );
}
