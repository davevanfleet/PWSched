import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/logout';

const AuthMenu = (props) => {
    const handleLogout = (e) => {
        e.preventDefault()
        props.logout(props.history)
    }

    if (props.currentUser) {
        return (
            <Nav className="ml-auto">
                <LinkContainer to="/" onClick={handleLogout}>
                    <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
            </Nav>
        )
    } else {
        return (
            <Nav className="ml-auto">
                <LinkContainer to="/register">
                    <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
            </Nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => dispatch(logout(history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthMenu))