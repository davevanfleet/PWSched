import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/register';

const RegisterForm = (props) => {
    const [ email, setEmail ] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const [ password, setPassword ] = useState('')
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const [ passwordConfirm, setPasswordConfirm ] = useState('')
    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("registering...")
        const credentials = {
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }
        props.register(credentials)
    }

    // const congregationSelect = props.congregations.map(cong => )

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleRegister}>
                <p><label htmlFor="email">Email: </label><input type="text" 
                                                                name="email" 
                                                                value={email} 
                                                                onChange={handleEmailChange} /></p>
                <p><label htmlFor="password">Password: </label><input type="password" 
                                                                      name="password"
                                                                      value={password} 
                                                                      onChange={handlePasswordChange} /></p>
                <p><label htmlFor="passwordConfirm">Confirm Password: </label><input type="password" 
                                                                             name="password"
                                                                             value={passwordConfirm} 
                                                                             onChange={handlePasswordConfirmChange} /></p>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        congregations: state.congregations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (credentials) => dispatch(register(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);