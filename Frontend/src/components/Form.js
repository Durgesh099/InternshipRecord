import React,{useState} from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';

const Form = () =>{
    const [user, setUser] = useState({teacher:'',gender:'',dob:'',phn:'',address:'',internship:''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
          }));
    };

    const token = localStorage.getItem('user')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log(user)
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/dashboard/form', {
            method: 'PATCH',
            headers: {
              'Content-Type':'application/json',
              Authorization: JSON.parse(token)
            },
            body: JSON.stringify(user),
          });

          const data = await response.json()
    
          if (response.ok) {
            console.log(data.message);
            navigate('/dashboard')
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };







    return(
        <form onSubmit={handleSubmit}>
            <div className="main">

                <div className="wrapper">
                        <ul>
                            <h1>Update Student Information</h1>
                            
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
                                        <span className="txt">DOB: </span>
                                        <input type="date" pattern="\d{4}-\d{2}-\d{2}" name="dob" value={user.dob} onChange={handleChange} required placeholder="yyyy-mm-dd"/>                              
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
                                        <span className="txt">Internships: </span>
                                        <input type="text" name="internship" value={user.internship} onChange={handleChange} required/>
                                </div>
                            </li>
                            <p>*Internship can be completed/on-going. You can input multiple internships. Insert 'NONE' if not eligible.*</p>
                            <li>
                                <button type="submit" className="btn" name='save'>Submit</button>
                            </li> 
                        </ul>
                </div>
            </div>
        </form>
    )
}

export default Form