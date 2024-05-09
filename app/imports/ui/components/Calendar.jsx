import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { StudySessions } from '../../api/studysession/StudySession';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sessions = StudySessions.collection.find().fetch();
      const formattedEvents = sessions.map(session => ({
        title: session.name,
        start: session.dateStart,
        end: session.dateEnd,
      }));
      setEvents(formattedEvents);
    };

    fetchData();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false,
      }}
    />
  );
};

export default Calendar;
