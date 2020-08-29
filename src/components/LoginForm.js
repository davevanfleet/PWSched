import React, { useState } from 'react'; 

const LoginForm = (props) => {
    const [ username, setUsername ] = useState('')
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const [ password, setPassword ] = useState('')
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('logging in')
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <p><label htmlFor="username">Username: </label><input type="text" 
                                                                      name="username" 
                                                                      value={username} 
                                                                      onChange={handleUsernameChange} /></p>
                <p><label htmlFor="username">Password: </label><input type="password" 
                                                                      name="password"
                                                                      value={password} 
                                                                      onChange={handlePasswordChange} /></p>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default LoginForm;