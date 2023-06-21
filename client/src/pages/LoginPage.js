import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    async function login(ev) {
        ev.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/login", {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': "application/json" },
                credentials: 'include'

            })
            if (response.status != 200) {
                alert("Invaid crediantials please try again ")
            }
            else {
                setRedirect(true)
            }
        } catch (error) {
            alert(error)
        }


    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <form className='login' onSubmit={login}>
                <h1>Login</h1>
                <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage