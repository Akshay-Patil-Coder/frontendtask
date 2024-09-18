import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Newregister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [status, setStatus] = useState('Active');
  const [role, setRole] = useState('User');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [allroles, setAllroles] = useState([]);
  const [pic, setPic] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:2444/allroles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const result = await response.json();
      setAllroles(result);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Error fetching roles');
    }
  };

  const postDetails = async (pics) => {
    if (!pics) {
      setError('Please choose an image');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(pics.type)) {
      setError('Please select an image (JPEG or PNG)');
      return;
    }

    const data = new FormData();
    data.append('file', pics);
    data.append('upload_preset', 'chat-image');
    data.append('cloud_name', 'akshaypatil09988');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/akshaypatil09988/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Failed to upload image');
      
      const responseData = await response.json();
      setPic(responseData.url);
      console.log(pic)
      setError('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image');
    }
  };

  const createuser = async () => {
    if (!name || !email || !password || !confirmPassword || !mobileno || !status || !role || !pic) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = { name, mobileno, email, status, role, password, pic };
      const response = await fetch('http://localhost:2444/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to register');
      navigate('/newHome');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    createuser();
  };

  return (
    <div className="form-container">
      <Form className="custom-form" onSubmit={handleSubmit}>
        <h2>Create New User</h2>

        {error && <div className="error-message">{error}</div>}

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

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
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
          <div style={{ width: '50%' }}>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label="Select Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="User">User</option>
                {allroles.map((item) => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <br />

        <Button type="submit" variant="primary">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default Newregister;
