import React from 'react';
import Calendar from '../components/Calendar';

const CalendarPage = () => (
  <div className="App">
    <h1 style={{ color: 'var(--matr-navbar-text-color)' }}>Scheduled Study Sessions</h1>
    <Calendar />
  </div>
);
export default CalendarPage;
