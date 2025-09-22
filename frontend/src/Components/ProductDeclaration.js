import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationPicker({ setSelectedLocation }) {
  useMapEvents({
    click(e) {
      setSelectedLocation(e.latlng);
    },
  });
  return null;
}

const ProductDeclaration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "",
    units: "",
    cultivationDate: "",
    harvestingDate: "",
    locationText: "",
    comments: "",
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const products = [
    "Tomato", "Carrot", "Cabbage", "Potato", "Beans", "Pumpkin",
    "Onion", "Brinjal (Eggplant)", "Okra", "Leeks", "Radish", "Beetroot"
  ];

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure a location was picked
    if (!selectedLocation) {
      alert("Please pick a location on the map before submitting.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...formData,
      // store plain numbers for lat/lng
      location: {
        lat: Number(selectedLocation.lat),
        lng: Number(selectedLocation.lng),
      }
    };

    const existing = JSON.parse(localStorage.getItem("declarations") || "[]");
    existing.push(newEntry);
    localStorage.setItem("declarations", JSON.stringify(existing));

    // notify other components to reload
    window.dispatchEvent(new Event("declarationsUpdated"));

    // optionally navigate back to dashboard so users see it immediately
    navigate("/dashboard");

    // reset (won't be seen because we navigate away)
    setFormData({
      product: "",
      units: "",
      cultivationDate: "",
      harvestingDate: "",
      locationText: "",
      comments: "",
    });
    setSelectedLocation(null);
  };

  const handleCancel = () => {
    setFormData({
      product: "",
      units: "",
      cultivationDate: "",
      harvestingDate: "",
      locationText: "",
      comments: "",
    });
    setSelectedLocation(null);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold">Product Declaration</h3>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formProduct">
              <Form.Label>Select Product</Form.Label>
              <Form.Select
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              >
                <option value="">Select a product</option>
                {products.map((prod, i) => <option key={i} value={prod}>{prod}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group controlId="formUnits">
              <Form.Label>No. of Units</Form.Label>
              <Form.Control
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                min="1"
                placeholder="Ex: 10"
                required
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formCultivationDate">
              <Form.Label>Date of Cultivation</Form.Label>
              <Form.Control
                type="date"
                name="cultivationDate"
                value={formData.cultivationDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="formHarvestingDate">
              <Form.Label>Date of Harvesting</Form.Label>
              <Form.Control
                type="date"
                name="harvestingDate"
                value={formData.harvestingDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

         {/* Map picker */}
        <Row className="mb-4">
          <Col>
            <Form.Label>Select Location on Map (click to place marker)</Form.Label>
            <div style={{height:"450px", border:"2px solid #333", borderRadius:10, overflow:"hidden"}}>
              <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{height:"100%", width:"100%"}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap"/>
                <LocationPicker setSelectedLocation={setSelectedLocation} />
                {selectedLocation && <Marker position={selectedLocation} icon={redIcon} />}
              </MapContainer>
            </div>

            {selectedLocation && (
              <p className="mt-2 text-muted">
                📍 Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formComments">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Optional comments"
              />
            </Form.Group>
          </Col>
        </Row>

       

        <Row className="mt-4">
          <Col>
            <Button variant="secondary" className="me-3" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProductDeclaration;


