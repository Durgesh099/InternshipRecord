import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './Signup.css'
import './Dashboard.css'

const Dashboard = () => {
    const [radio, setRadio] = useState(false)
    const [user, setUser] = useState('')

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const decoded = jwt_decode(token)
            setUser(decoded.user)
        }
    },[])

    function handleChange(e){
        setRadio(e.target.value)
    }
    

    return(
        <div className='wrapper1'>
            <div className='header'>
                <h1>Dashboard</h1>
            </div>
            <ul className='ul'>
            <div className='body'>
            <h2>Name : <span className='span'>{user.name}</span></h2>
            <h2>Roll No. : <span className='span'>{user.roll}</span></h2>
            <h2>Division : <span className='span'>{user.divi}</span></h2>
            <h2>Year : <span className='span'>{user.course}</span></h2>
            <h2>Gender : <span className='span'>{user.gender}</span></h2>
            <h2>Branch : <span className='span'>Computer Engineering</span></h2>
            <h2>Email : <span className='span'>{user.email}</span></h2>
            <h2>Teacher : <span className='span'>{user.teacher}</span></h2>
            <h2>Phone No. : <span className='span'>{user.phn}</span></h2>
            <h2>Address : <span className='span'>{user.address}</span></h2>
            <h2>Internships completed/ongoing : <span className='span'>{user.iid?.length}</span></h2>
            <h2>Add new Internship? : 
                <input 
                 id='yesOption'
                 type='radio' 
                 name='radio'
                 checked={radio === 'Yes'}
                 onChange={handleChange} 
                 value="Yes"/>Yes{"  "}  
                <input 
                 id='noOption' 
                 type='radio' 
                 name='radio' 
                 checked={radio === "No"}
                 onChange={handleChange} 
                 value="No"/>No
            </h2>
            {radio ==='Yes' && <h2><center>
                <Link to='/dashboard/company' className='link'>Add Details</Link>
            </center></h2>}
            </div>
            </ul>
        </div>
    )
}

export default Dashboard