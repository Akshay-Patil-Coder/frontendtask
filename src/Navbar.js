import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Newallroles from './Newallroles';
import Newallusers from './Newallusers';
import Newhome from './Newhome';
import Logout from './Logout';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set default active key based on the current path
  const [activeKey, setActiveKey] = useState(location.pathname);

  useEffect(() => {
    // Update active key when location changes
    setActiveKey(location.pathname);
  }, [location]);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    navigate(selectedKey); // Navigate to the selected route
  };

  return (
    <div>
      <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="/newHome" as={Link} to="/newHome">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/allroles" as={Link} to="/allroles">Roles</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/allusers" as={Link} to="/allusers">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/logout" as={Link} to="/logout">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <br />
      {
        activeKey === "/newHome" ? <Newhome /> :
        activeKey === "/allroles" ? <Newallroles /> :
        activeKey === "/allusers" ? <Newallusers /> :
        activeKey === "/logout" ? <Logout /> : null
      } */}
    </div>
  );
}

export default Navbar;
