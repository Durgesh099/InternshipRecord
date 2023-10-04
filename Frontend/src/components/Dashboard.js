import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import './Signup.css'

const Dashboard = () => {
    const [user, setUser] = useState('')

    useEffect(()=>{
        const token = localStorage.getItem('user')
        if(token){
            const decoded = jwt_decode(token)
            setUser(decoded.user)
        }
    },[])

    return(
        <div className='wrapper'>
            <ul className='ul'>
            <h2>Name : {user.name}</h2>
            <h2>Roll No. : {user.roll}</h2>
            <h2>Division : {user.divi}</h2>
            <h2>Year : {user.course}</h2>
            <h2>Gender : {user.gender}</h2>
            <h2>Branch : Computer Engineering</h2>
            <h2>Email : {user.email}</h2>
            <h2>Date of Birth : {user.dob}</h2>
            <h2>Teacher : {user.teacher}</h2>
            <h2>Phone No. : {user.phn}</h2>
            <h2>Address : {user.address}</h2>
            <h2>Internships : {user.internship}</h2>
            <Link to='/dashboard/form' className='link'>Update Details</Link>
            </ul>
        </div>
    )
}

export default Dashboard