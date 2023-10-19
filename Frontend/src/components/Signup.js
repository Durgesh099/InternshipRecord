import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/auth-context'
import { TailSpin } from 'react-loader-spinner';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

const Signup = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('company')

    const [Loading, setLoading]=useState(false)

    const [user, setUser] = useState({course:'',divi:'',name:'',email:'',pass:'',roll:'',teacher:'',gender:'',phn:'',address:''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
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
                console.log(data.user)
                localStorage.setItem('token',data.token)
                navigate('/dashboard')
                return auth.login()
          } else {
                console.log(data.message);
          }
        } catch (error) {
            console.error('Error:',error);
        }
        setLoading(false)
    };


    const signupDisable = !user.course || !user.divi || !user.email || !user.name || !user.pass || !user.roll


   
    

    return(
        <div>
        {Loading? (
            <div className='Tailspin'>
            <TailSpin
            color='#00BFFF'
            height="200"
            width="200"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperClass=""
            />
            </div>
        ) : (
        <form onSubmit={handleSubmit}>
            <div className="main">
                <div className="wrapper">
                    <ul>
                        <h1>Course Information</h1>
                        <div className="input-box">
                                <span className="txt">Course: </span>
                                <select name="course" value={user.course} onChange={handleChange} required>
                                    <option defaultValue="none">Select an option</option>
                                    <option name="FE" value="FE">FE</option>
                                    <option name="SE" value="SE">SE</option>
                                    <option name="TE" value="TE">TE</option>
                                    <option name="BE" value="BE">BE</option>
                                </select>
                        </div>
                        <div className="input-box">
                                <span className="txt">Division: </span>
                                <select name="divi" value={user.divi} onChange={handleChange} required>
                                    <option defaultValue="none">Select an option</option>
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
                                        <span className="txt">Teacher: </span>
                                        <input type="text" name="teacher" value={user.teacher} onChange={handleChange} required/>
                                </div>
                            </li>
                
                            <li>
                                <div className="input-box">
                                        <span className="txt">Gender: </span>
                                        <select name="gender" value={user.gender} onChange={handleChange} required>
                                            <option defaultValue="none">Select an Option</option>
                                            <option name="Male">Male</option>
                                            <option name="Female">Female</option>
                                        </select>
                                </div>
                            </li>
                            <li>
                                <div className="input-box">
                                        <span className="txt">Phone no.: </span>
                                        <input type="text" name="phn" value={user.phn} onChange={handleChange} required/>
                                </div>
                            </li>
                            <li>
                                <div className="input-box">
                                        <span className="txt">Address: </span>
                                        <input type="text" name="address" value={user.address} onChange={handleChange} required/>
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
        </form>)}
        </div>
    )
}

export default Signup