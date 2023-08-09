import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)
    const { setUserInfo } = useContext(UserContext)


    async function login(ev) {
        ev.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': "application/json" },
                credentials: 'include'

            })
            if (response.status != 200) {
                alert("Invaid crediantials please try again ")
            }
            else {
                response.json().then(userInfo => {

                    setUserInfo(userInfo)
                    setRedirect(true)
                })
            }
        } catch (error) {
            alert(error)
        }


    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='w-1/2 mx-auto'>
            <form className='login' onSubmit={login}>
                <h1 className='text-xl py-5 font-bold'>Login</h1>
                <div className='flex flex-col gap-2'>
                    <input className='p-1' type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className='p-1' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className='bg-slate-500 my-5 text-white py-2 hover:bg-slate-300 duration-150 ease-in-out '>Login</button>
            </form>
        </div>
    )
}

export default LoginPage