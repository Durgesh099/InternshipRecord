import React,{useState} from 'react'
import jwt_decode from 'jwt-decode'
import { TailSpin } from 'react-loader-spinner';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

const Form = () =>{
    const [Loading,setLoading] = useState(false)

    const token = localStorage.getItem('user')
    const decoded = jwt_decode(token)
    const navigate = useNavigate()


    const [user, setUser] = useState({
        teacher:decoded.user.teacher,
        gender:decoded.user.gender,
        phn:decoded.user.phn,
        address:decoded.user.address});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
          }));
    };

    const handleSubmit = async (e) => {
        setLoading(true)
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
            localStorage.setItem('user',JSON.stringify(data.auth))
            console.log(data.message,data.auth);
            setLoading(false)
            navigate('/dashboard')
          } else {
            console.log(data.message);
            setLoading(false)
          }
        } catch (error) {
          console.error('Error:', error);
          setLoading(false)
        }
    };







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
        ):(

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
                                <button type="submit" className="btn" name='save'>Submit</button>
                            </li> 
                        </ul>
                </div>
            </div>
        </form>)
        }
        </div>
    )
}

export default Form