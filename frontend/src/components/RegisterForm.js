import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/register';

const RegisterForm = (props) => {
    const [ name, setName ] = useState('')
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

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

    const [ congregation, setCongregation ] = useState('')
    const handleCongregationChange = (e) => {
        setCongregation(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("registering...")
        const credentials = { name, email, password, passwordConfirm, congregation}
        props.register(credentials)
    }

    const congregationOptions = props.congregations.map(cong => <option value={`${cong}`}>{cong}</option>)

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleRegister}>
                <div><label htmlFor="name">Name: </label><input type="text" 
                                                              name="name" 
                                                              value={name} 
                                                              onChange={handleNameChange} /></div>
                <div><label htmlFor="email">Email: </label><input type="text" 
                                                                name="email" 
                                                                value={email} 
                                                                onChange={handleEmailChange} /></div>
                <div><label htmlFor="password">Password: </label><input type="password" 
                                                                      name="password"
                                                                      value={password} 
                                                                      onChange={handlePasswordChange} /></div>
                <div><label htmlFor="passwordConfirm">Confirm Password: </label><input type="password" 
                                                                             name="password"
                                                                             value={passwordConfirm} 
                                                                             onChange={handlePasswordConfirmChange} /></div>
                <div><label htmlFor="congregation">Congregation: </label><select name="congregation"
                                                                               value={congregation}
                                                                               onChange={handleCongregationChange}>
                                                                            <option value=''>Select a Congregation</option>
                                                                            { congregationOptions }
                                                                       </select></div>
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