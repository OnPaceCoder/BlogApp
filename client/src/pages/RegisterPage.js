import React, { useState, useRef } from 'react'
import { Navigate, redirect } from 'react-router-dom';


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    async function register(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': "application/json" },
        })

        if (response?.status !== 200) {
            alert("Registration failed please try again ")
        }
        else {
            alert("Registration successfull!")
            setRedirect(true)

        }

    }
    if (redirect) {
        return < Navigate to={'/'} />
    }

    return (
        <div className='w-1/2 mx-auto'>
            <form className='register' onSubmit={register}>
                <h1 className='text-xl py-5 font-bold'>Registration</h1>
                <div className='flex flex-col gap-2'>

                    <input className='p-1' type="text" placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />
                    <input className='p-1' type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                </div>
                <button type='submit' className='bg-slate-500 my-5 text-white py-2 hover:bg-slate-300 duration-150 ease-in-out '>Register</button>
            </form></div>
    )
}

export default RegisterPage