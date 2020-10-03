import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/logout';
import { getCurrentUser } from '../actions/getCurrentUser';
import { fetchCongregations } from '../actions/fetchCongregations';
import AuthMenu from '../components/AuthMenu';

const Layout = (props) => {
    useEffect(() => {
        props.getCurrentUser()
        props.fetchCongregations()
    }, [props.getCurrentUser, props.fetchCongregations])

    return(
        <div className="layout">
            <Navbar collapseOnSelect expand="md" bg="light">
                <LinkContainer to="/">
                    <Navbar.Brand>Home</Navbar.Brand>
                </LinkContainer>
                {props.currentUser ? <LinkContainer to="/shifts">
                                        <Nav.Link>Shifts</Nav.Link>
                                     </LinkContainer> : null}
                <AuthMenu />
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
        logout: (history) => dispatch(logout(history)),
        getCurrentUser: () => dispatch(getCurrentUser()),
        fetchCongregations: () => dispatch(fetchCongregations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)