import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = (props) => {
    return(
        <div className="layout">
            <Navbar collapseOnSelect expand="md" bg="light">
                <LinkContainer to="/">
                    <Navbar.Brand>Home</Navbar.Brand>
                </LinkContainer>
                <LinkContainer to="/shifts">
                    <Nav.Link>Shifts</Nav.Link>
                </LinkContainer>
                <Nav className="ml-auto">
                    {props.currentUser ? <LinkContainer to="/"><Nav.Link onClick={event => props.logout(event)}>Logout</Nav.Link></LinkContainer> : null}
                </Nav>
            </Navbar>
            {props.children}
        </div>
    )
}

export default Layout