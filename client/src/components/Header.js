import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        async function callProfile() {

            const response = await fetch("http://localhost:4000/profile", {
                credentials: 'include'
            })
            response.json().then((data) => { setUserName(data.username) })
        }
        callProfile()
    }, [])

    return (
        <div>
            <header>
                <Link to={"/"} className='logo'>MYBlog</Link>
                <nav>
                    {userName && (<> <Link to="/create">Create new blog</Link>
                        <a>Logout</a>
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