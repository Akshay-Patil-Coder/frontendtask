import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Newcreaterole() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  const createrole = async () => {
    if (!name || !status) {
      console.log("Please fill all fields");
      return;
    }
    try {
      const data = { name, status };
      console.log(data)
      const response = await fetch("http://localhost:2444/createrole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to register");
      }
      navigate("/newHome");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="form-container">
      <Form className="custom-form">
        <h2>Create New Role</h2>

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Select Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Active" selected>Active</option>
            <option value="Deactive">Deactive</option>
          </Form.Select>
        </Form.Group>

        <br />

        <Button onClick={createrole} variant="primary">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default Newcreaterole;
