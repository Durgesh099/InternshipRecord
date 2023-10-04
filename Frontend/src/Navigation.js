import React, {useContext} from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'
import {AuthContext} from './context/auth-context'

const Navigation = () => {
    const auth = useContext(AuthContext);

    const Logout = ()=>{
        localStorage.removeItem('user')
        return auth.logout()
    }

    return(
        <div className='nav-bar'>
            {auth.isLoggedIn && <Link to='/dashboard' className='navlink'>Dashboard</Link>}
            {auth.isLoggedIn && <Link to='/' className='navlink' onClick={Logout}>Logout</Link>}
            {!auth.isLoggedIn && <Link to='/' className='navlink'>Login</Link>}
            {!auth.isLoggedIn && <Link to='/signup' className='navlink'>Signup</Link>}
        </div>
    )
}

export default Navigation