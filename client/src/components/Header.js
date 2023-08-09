import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const Header = () => {
    // const [userName, setUserName] = useState(""); 
    const { setUserInfo, userInfo } = useContext(UserContext)

    useEffect(() => {
        async function callProfile() {

            const response = await fetch("http://localhost:4000/api/profile", {
                credentials: 'include'
            })

            response?.json().then((data) => { setUserInfo(data); })
        }
        callProfile()
    }, [])


    const logout = function () {
        fetch("http://localhost:4000/api/auth/logout", {
            credentials: 'include',
            method: 'POST'
        })
        setUserInfo(null)
    }
    const userName = userInfo?.username;

    return (
        <div className='w-full'>
            <header className='max-w-[800px] px-5 bg-slate-100 py-4 mt-0'>
                <Link to={"/"} className='logo'>Priyank Blogs</Link>
                <nav>
                    {userName && (<> <Link to="/create" ><button className='bg-slate-400 px-2 py-2 hover:bg-slate-200 duration-150 ease-in-out'>Create new blog</button></Link>
                        <Link to={"/"} onClick={logout}><button className='bg-slate-400 px-2 py-2 w-24  hover:bg-slate-200 duration-150 ease-in-out'>Logout</button></Link>
                    </>)}
                    {!userName && (<>
                        <Link to="/login"><button className='bg-slate-400 px-2 py-2 w-24  hover:bg-slate-200 duration-150 ease-in-out'>Login</button>
                        </Link>
                        <Link to="/register"><button className='bg-slate-400 px-2 py-2 w-24  hover:bg-slate-200 duration-150 ease-in-out'>Register</button></Link>
                    </>)}
                </nav>
            </header></div>
    )
}

export default Header




