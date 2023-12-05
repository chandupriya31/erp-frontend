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
      if (ele.customerId && ele.quotationId && ele.customerId._id === ele.quotationId.customer) {
         const customerId = ele.customerId._id;
         const totalCost = ele.quotationId.totalCost;

         if (!customerTotals[customerId]) {
            customerTotals[customerId] = totalCost;
         } else {
            customerTotals[customerId] += totalCost;
         }
      }
   });
   console.log(customerTotals);

   const chart = Object.entries(customerTotals).map(([customerId, totalCost]) => {
      const customerName = userState.company?.orders?.find(ele => ele.customerId._id === customerId)?.customerId?.username || "Unknown";
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
