import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const Header = () => {
    // const [userName, setUserName] = useState(""); 
    const { setUserInfo, userInfo } = useContext(UserContext)

    useEffect(() => {
        async function callProfile() {

            const response = await fetch("http://localhost:4000/profile", {
                credentials: 'include'
            })

            response.json().then((data) => { setUserInfo(data); })
        }
        callProfile()
    }, [])

    const logout = function () {
        fetch("http://localhost:4000/logout", {
            credentials: 'include',
            method: 'POST'
        })
        setUserInfo(null)
    }
    const userName = userInfo?.username;

    return (
        <div>
            <header>
                <Link to={"/"} className='logo'>MYBlog</Link>
                <nav>
                    {userName && (<> <Link to="/create">Create new blog</Link>
                        <a onClick={logout}>Logout</a>
                    </>)}
                    {!userName && (<>
                        <Link to="/login">Login
                        </Link>
                        <Link to="/register">Register</Link>
                    </>)}
                </nav>
            </header></div>
    )
}

export default Header