import React, { useState } from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../actions/login';

const LoginForm = (props) => {
    const [ email, setEmail ] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const [ password, setPassword ] = useState('')
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('logging in')
        props.login({"email": email,
                     "password": password}, props.history)
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <p><label htmlFor="email">Email: </label><input type="text" 
                                                                name="email" 
                                                                value={email} 
                                                                onChange={handleEmailChange} /></p>
                <p><label htmlFor="password">Password: </label><input type="password" 
                                                                      name="password"
                                                                      value={password} 
                                                                      onChange={handlePasswordChange} /></p>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials, history) => dispatch(login(credentials, history))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));