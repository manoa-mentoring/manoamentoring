// components/MyCalendar.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => (
  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    events={[
      { title: 'Event 1', date: '2024-04-01' },
      { title: 'Event 2', date: '2024-04-15' },
    ]}
  />
);

export default Calendar;
