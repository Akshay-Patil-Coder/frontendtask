import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Newallusers() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [status, setStatus] = useState('Active');
  const [role, setRole] = useState('User');
  const [pic, setPic] = useState(null);  // Added state for image
  const [allroles, setAllroles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    newroles();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setMobileNo(user.mobileno);
    setStatus(user.status);
    setRole(user.role);
    setPic(user.pic); // Added to set current image
    setShow(true);
  };

  const newroles = async () => {
    try {
      let result = await fetch('http://localhost:2444/allroles');
      result = await result.json();
      setAllroles(result);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchData = async () => {
    try {
      let result = await fetch("http://localhost:2444/allusers");
      result = await result.json();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteuser = async (id) => {
    try {
      await fetch(`http://localhost:2444/deleteuser/${id}`, {
        method: 'DELETE',
      });
      fetchData(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateuser = async () => {
    try {
      const updatedUser = { name, email, mobileno, status, role, pic };
      await fetch(`http://localhost:2444/updateuser/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      handleClose(); // Close the modal after updating
      fetchData();   // Refresh the list after updating
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to handle image upload to Cloudinary
  const postDetails = async (file) => {
    if (!file) return;
    
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'chat-image');
    data.append('cloud_name', 'akshaypatil09988');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/akshaypatil09988/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      setPic(result.url);  // Store the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigateToCreateUser = () => {
    navigate('/register');
  };

  return (
    <div>
      <Navbar />
      <br />
      <Button
        variant="primary"
        size="lg"
        style={{ borderRadius: "100%" }}
        onClick={navigateToCreateUser}
      >
        New User
      </Button>

      <div style={{ width: "100%" }}>
        <h4>____________________________*</h4>
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Role</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={item.pic}
                  style={{ borderRadius: "50%", height: "40px", width: "40px" }}
                  alt="User"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobileno}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleShow(item)}>
                  UPDATE
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteuser(item._id)}
                >
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Updating User */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMobileNo">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile No"
                value={mobileno}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              {pic && <img src={pic} alt="Profile" style={{ width: '80px', marginTop: '10px' }} />}
            </Form.Group>

            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="Select Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                  </Form.Select>
                </Form.Group>
              </div>

              &nbsp;&nbsp;

              <div style={{ width: "50%" }}>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Select Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="User">User</option>
                    {allroles.map((data) => (
                      <option key={data._id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateuser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Newallusers;
