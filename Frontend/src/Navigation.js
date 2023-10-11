import React, {useContext} from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'
import {AuthContext} from './context/auth-context'

const Navigation = () => {
    const auth = useContext(AuthContext);

    const Logout = ()=>{
        localStorage.removeItem('token')
        return (
            auth.logout(),
            auth.adminLogout()
        )
    }

    return(
        <div className='nav-bar'>
            {!auth.isAdminLoggedIn && <Link to='/admin' className='navlink'>Admin</Link>}
            {auth.isLoggedIn && <Link to='/dashboard' className='navlink'>Dashboard</Link>}
            {(auth.isLoggedIn || auth.isAdminLoggedIn) && <Link to='/' className='navlink' onClick={Logout}>Logout</Link>}
            {!auth.isLoggedIn && !auth.isAdminLoggedIn && <Link to='/' className='navlink'>Login</Link>}
            {!auth.isLoggedIn && !auth.isAdminLoggedIn && <Link to='/signup' className='navlink'>Signup</Link>}
        </div>
    )
}

export default Navigation