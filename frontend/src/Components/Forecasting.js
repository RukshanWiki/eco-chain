import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Alert, Card } from "react-bootstrap";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"; // for graphs
import CultivationMap from "./CultivationMap";
import "../CSS/Dashboard.css";

const Forecasting = () => {
  const [selectedVeg, setSelectedVeg] = useState("All");
  const [allDeclarations, setAllDeclarations] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [adminComments, _setAdminComments] = useState([
    { veg: "Carrot", text: "Oversupply expected next month due to heavy cultivation." },
    { veg: "Tomato", text: "Harvesting season is aligning with high demand." },
    { veg: "Cabbage", text: "Monitor closely; demand may drop in Colombo." }
  ]);

  useEffect(() => {
    const load = () => {
      const data = JSON.parse(localStorage.getItem("declarations") || "[]");
      setAllDeclarations(data);
    };
    load();
    // listen for updates
    const handler = () => load();
    window.addEventListener("declarationsUpdated", handler);
    return () => window.removeEventListener("declarationsUpdated", handler);
  }, []);

  // Build unique vegetable list
  const productSet = new Set(
    allDeclarations.map((d) => (d.product || "").trim()).filter(Boolean)
  );
  const productsFromData = Array.from(productSet).sort();

  const defaultVegList = [
    "Carrot","Tomato","Cabbage","Onion","Pumpkin",
    "Brinjal (Eggplant)","Okra","Beans","Cucumber","Radish","Leeks","Spinach"
  ];
  const vegetables = [...new Set([...productsFromData, ...defaultVegList])];

  const handleSelect = (eventKey) => {
    setSelectedVeg(eventKey);
  };

  const filteredLocations = allDeclarations.filter((item) => {
    if (!item || !item.product) return false;
    if (selectedVeg === "All") return true;
    return (item.product || "").trim().toLowerCase() === (selectedVeg || "").trim().toLowerCase();
  });

  // Example: Sri Lankan consumption limits (tons) – dummy values
  const consumptionLimits = {
    Carrot: 100,
    Tomato: 120,
    Cabbage: 80,
    Onion: 200,
    Pumpkin: 150
  };

  // Calculate total cultivation count for selectedVeg
  const totalCultivation = filteredLocations.length;
  const limit = consumptionLimits[selectedVeg] || 100; // fallback default

  let status = { color: "success", message: "Supply and demand are balanced ✅" };
  if (totalCultivation > limit * 1.2) {
    status = { color: "danger", message: "⚠ Oversupply risk! Prices may drop." };
  } else if (totalCultivation >= limit * 0.9 && totalCultivation <= limit * 1.1) {
    status = { color: "warning", message: "⚠ Near consumption margin, monitor closely." };
  }

  // Fake price fluctuation data for demo (replace with real data logic)
  const chartData = [
    { month: "Jan", price: 150 },
    { month: "Feb", price: 140 },
    { month: "Mar", price: 160 },
    { month: "Apr", price: 120 },
    { month: "May", price: 170 },
    { month: "Jun", price: 155 }
  ];

  return (
    <Container className="mt-5">
      {/* Status Banner */}
      <Row className="mb-4">
        <Col>
          <Alert variant={status.color} className="text-center fs-5 fw-bold">
            {status.message}
          </Alert>
        </Col>
      </Row>

      {/* Title + Dropdown */}
      <Row className="mb-4" style={{alignContent:'space-between'}}>
        <Col>
          <h1 className="fw-bold" style={{ color: "#1B5E20" }}>Forecasting Dashboard</h1>
        </Col>
        <Col md={4}>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown" style={{ textAlign: "left" }}>
              {selectedVeg === "All" ? "Show All" : selectedVeg}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">Show All</Dropdown.Item>
              {vegetables.map((veg, i) => (
                <Dropdown.Item key={i} eventKey={veg}>{veg}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Graph Section */}
      <Row className="mb-5">
        <Col>
          <Card className="p-3 shadow">
            <h4 className="mb-3">📈 Price Fluctuation Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#1B5E20" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Map Section */}
      <Row className="mb-5">
        <Col>
          <Card className="p-3 shadow">
            <h4 className="mb-3">🗺 Cultivation Map</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CultivationMap locations={filteredLocations} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Admin Comments */}
      <Row>
        <Col>
          <Card className="p-3 shadow">
            <h4 className="mb-3">📝 Admin Comments</h4>
            <ul>
              {adminComments
                .filter(c => selectedVeg === "All" || c.veg.toLowerCase() === selectedVeg.toLowerCase())
                .map((c, i) => (
                  <li key={i}><strong>{c.veg}:</strong> {c.text}</li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Forecasting;
