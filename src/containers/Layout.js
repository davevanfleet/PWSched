import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/logout';

const Layout = (props) => {
    const handleLogout = (e) => {
        e.preventDefault()
        props.logout(props.history)
    }

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
                    {props.currentUser ? <LinkContainer to="/" onClick={handleLogout}><Nav.Link>Logout</Nav.Link></LinkContainer> : <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>}
                </Nav>
            </Navbar>
            {props.children}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        errors: state.errorMessages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => {dispatch(logout(history))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)