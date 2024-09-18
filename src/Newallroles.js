import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

function Newallroles() {
    const [roles, setRoles] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = (role) => {
        setSelectedRole(role); // Set the selected role for editing
        setName(role.name);     // Set the name of the role in the form
        setStatus(role.status); // Set the status of the role in the form
        setShow(true);          // Show the modal
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let result = await fetch('http://localhost:2444/allroles');
            result = await result.json();
            setRoles(result);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const deleterole = async (id) => {
        try {
            await fetch(`http://localhost:2444/deleterole/${id}`, {
                method: 'DELETE',
            });
            fetchData(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const updaterole = async () => {
        try {
            let updatedRole = { name, status };
            await fetch(`http://localhost:2444/updaterole/${selectedRole._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRole),
            });
            handleClose(); // Close the modal after updating
            fetchData();   // Refresh the list after updating
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const navigater = () => {
        navigate('/createrole');
    };

    return (
        <div>
            <Navbar />
            <br />
            <Button
                variant="primary"
                size="lg"
                style={{ borderRadius: '100%' }}
                onClick={navigater}
            >
                New Role
            </Button>

            <div style={{ width: '100%' }}>
                <h4>____________________________*</h4>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleShow(item)}
                                >
                                    UPDATE
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleterole(item._id)}
                                >
                                    DELETE
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formRoleName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                aria-label="Select Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updaterole}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Newallroles;
