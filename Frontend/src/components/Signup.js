import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/auth-context'
import './Signup.css'
import { useNavigate } from 'react-router-dom';

const Signup = () =>{
    const [user, setUser] = useState({course:'',divi:'',name:'',email:'',pass:'',roll:''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    
          const data = await response.json()
          if (response.ok) {
                localStorage.setItem('user',JSON.stringify(data.auth))
                console.log(data.message)
                navigate('/dashboard')
                return auth.login()
          } else {
                console.log(data.error);
          }
        } catch (error) {
          console.error('Error:',error);
        }
    };


    const signupDisable = !user.course || !user.divi || !user.email || !user.name || !user.pass || !user.roll

    return(
        <form onSubmit={handleSubmit}>
            <div className="main">
                <div className="wrapper">
                    <ul>
                        <h1>Course Information</h1>
                        <div className="input-box">
                                <span className="txt">Course: </span>
                                <select name="course" value={user.course} onChange={handleChange} required>
                                    <option name="FE" value="FE">FE</option>
                                    <option name="SE" value="SE">SE</option>
                                    <option name="TE" value="TE">TE</option>
                                    <option name="BE" value="BE">BE</option>
                                </select>
                        </div>
                        <div className="input-box">
                                <span className="txt">Division: </span>
                                <select name="divi" value={user.divi} onChange={handleChange} required>
                                    <option name="A" value="A">A</option>
                                    <option name="B" value="B">B</option>
                                </select>
                        </div>
                    </ul>
                </div>

                <div className="wrapper">
                        <ul>
                            <h1>Student Registration</h1>
                            <li>
                                <div className="input-box">
                                        <span className="txt">Name: </span>
                                        <input type="text" name="name" value={user.name} onChange={handleChange} required/>
                                </div>
                            </li>
                            <li>
                                <div className="input-box">
                                        <span className="txt">Roll no.: </span>
                                        <input type="text" name="roll" value={user.roll} onChange={handleChange} required/>
                                </div>
                            </li>
                            <li>
                                <div className="input-box">
                                        <span className="txt">Email: </span>
                                        <input type="email" name="email" value={user.email} onChange={handleChange} required/>
                                </div>
                            </li>
                            <li>
                                <div className="input-box">
                                        <span className="txt">Password: </span>
                                        <input type="password" name="pass" value={user.pass} onChange={handleChange} required/>
                                </div>
                            </li>
                            <li>
                                {!signupDisable && <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>}
                            </li>
                        </ul>
                </div>
            </div>
        </form>
    )
}

export default Signup