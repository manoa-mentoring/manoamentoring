import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1-1030x1030.png"
            alt="Manoa Mentoring Logo"
            height="40"
            className="d-inline-block align-top"
          />
          <h2 style={{ display: 'inline-block', marginLeft: '10px', color: 'white' }}>Manoa Mentoring</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="user-homepage-nav" as={NavLink} to="/user-home" key="user-home">Home</Nav.Link>,
              <Nav.Link id="list-profiles-nav" as={NavLink} to="/view-profiles" key="list-profiles">View Profiles</Nav.Link>,
              <NavDropdown id="sessions-dropdown" title="Study Sessions">
                <NavDropdown.Item id="create-session-nav" as={NavLink} to="/create-study-session" key="create-session">
                  Create a Study Session
                </NavDropdown.Item>
                <NavDropdown.Item id="view-session-nav" as={NavLink} to="/view-study-session" key="register">
                  Register for a Study Session
                </NavDropdown.Item>
                <NavDropdown.Item id="my-session-nav" as={NavLink} to="/my-sessions" key="my-sessions">
                  My Sessions
                </NavDropdown.Item>
              </NavDropdown>,
              <Nav.Link id="calendar" as={NavLink} to="/calendar" key="cal">Calendar</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Log in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item as={NavLink} to="/my-profile"> My Profile </NavDropdown.Item>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <NavDropdown.Item as={NavLink} to="/admin"> Admin </NavDropdown.Item>
                ) : ''}
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
