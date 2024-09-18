import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    async function newlogin() {
        try {
            if (!email || !password) {
                console.log('Please enter all required data');
                return;
            }
            let result = await fetch('http://localhost:2444/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            result = await result.json();
            if (result.error) {
                console.log(result.error); // Handle error (e.g., incorrect login)
            } else {
                localStorage.setItem('UserInfo', JSON.stringify(result));
                navigate('/newHome');
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    const handleSendOtp = async () => {
        try {
            let result = await fetch('http://localhost:2444/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            });
            result = await result.json();
            if (result.success) {
                setOtpSent(true);
                console.log('OTP sent successfully');
            } else {
                console.log('Failed to send OTP');
            }
        } catch (error) {
            console.log('Error sending OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            let result = await fetch('http://localhost:2444/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, otp, newPassword }),
            });
            result = await result.json();
            if (result.success) {
                setShowOtpModal(false);
                console.log('Password reset successfully');
                navigate('/login');
            } else {
                console.log('Failed to verify OTP');
            }
        } catch (error) {
            console.log('Error verifying OTP');
        }
    };

    return (
        <>
            <div className="form-container">
                <Form className="custom-form">
                    <h2>Log In</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={newlogin}>
                        Log In
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="warning" onClick={() => setShowOtpModal(true)}>
                        Forget Password
                    </Button>
                </Form>
            </div>

            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {otpSent ? (
                        <>
                            <Form>
                                <Form.Group controlId="formOtp">
                                    <Form.Label>Enter the OTP sent to your email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>Enter New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </>
                    ) : (
                        <Form>
                            <Form.Group controlId="formResetEmail">
                                <Form.Label>Enter your email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {otpSent ? (
                        <Button variant="primary" onClick={handleVerifyOtp}>
                            Reset Password
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleSendOtp}>
                            Send OTP
                        </Button>
                    )}
                    <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;
