// CalendarPage.js
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Container } from "react-bootstrap";
import '../CSS/App.css'

const CalendarPage = () => {
  const [declarations, setDeclarations] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("declarations") || "[]");
      setDeclarations(data);
    };
    loadData();
    window.addEventListener("declarationsUpdated", loadData);
    return () => window.removeEventListener("declarationsUpdated", loadData);
  }, []);

  // Extract all cultivation and harvesting dates from declarations
  const dateInfo = {};
  declarations.forEach(item => {
    if (item.cultivationDate) {
      const d = item.cultivationDate;
      if (!dateInfo[d]) dateInfo[d] = [];
      dateInfo[d].push({ type: "cultivation", product: item.product });
    }
    if (item.harvestingDate) {
      const d = item.harvestingDate;
      if (!dateInfo[d]) dateInfo[d] = [];
      dateInfo[d].push({ type: "harvest", product: item.product });
    }
  });


  const tileClassName = ({ date, view }) => {
  if (view !== 'month') return null;

  const dateStr = date.toISOString().split('T')[0];
  if (dateInfo[dateStr]) {
    if (dateInfo[dateStr].some(d => d.type === "cultivation")) {
      return "cultivation-date"; // green background
    }
    if (dateInfo[dateStr].some(d => d.type === "harvest")) {
      return "harvest-date"; // red background
    }
  }
  return null;
};


  return (
    <Container className="mt-5">
      <h2 className="fw-bold mb-4">Cultivation & Harvest Calendar</h2>
      <Container className="mt-5 d-flex justify-content-center">
        <div className="calendar-wrapper">
          <Calendar
            tileClassName={tileClassName}
          />
        </div>
      </Container>

      <div className="mt-4">
        <strong>Legend:</strong> 
        <span style={{ color: 'green', marginLeft: '10px' }}>● Cultivation</span>
        <span style={{ color: 'red', marginLeft: '10px' }}>● Harvest</span>
      </div>
    </Container>
  );
};

export default CalendarPage;
