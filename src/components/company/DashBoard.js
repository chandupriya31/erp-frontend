import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';

function getRandomColor() {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  return randomColor;
}

export function DashBoard() {
  const orders = useSelector((state) => {
    return state.order?.order;
  });

  console.log('orders', orders)

  const calendarData = orders?.map((order) => ({
    title: `${order.customerId?.username} - ${order.productId?.productname} - ${order.delivery}`,
    date: order.deliveryDate,
    hasData: true
  }))

  console.log(calendarData);

  return (
    <div>
      <h1>DashBoard</h1>
      <Link to="/quotation-list">quotations sent</Link>
      <br />
      <Link to="/stats">sales stats</Link>
      <h5>Delivery dates</h5>
      {calendarData.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarData}
          eventContent={(eventInfo) => ({
            html: `<div style="background-color: ${getRandomColor()}">${eventInfo.event.title}</div>`,
          })}
          contentWidth="auto"
          aspectRatio={1.5}
        />
      )}
    </div>
  )
}
