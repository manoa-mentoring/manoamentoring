// components/MyCalendar.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => (
  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    events={[
      { title: 'ICS 314: WOD #7 Workshop', date: '2024-04-01T10:00:00', end: '2024-04-01T12:00:00' },
      { title: 'ICS 369: Maya Animation Review', date: '2024-04-15T14:00:00', end: '2024-04-15T16:00:00' },
    ]}
    eventTimeFormat={{
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
    }}
  />
);

export default Calendar;
