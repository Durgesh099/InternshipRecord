import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import jwt_decode from 'jwt-decode'
import '../Signup.css'

const Internship = () =>{
    const [Loading, setLoading]=useState(false)

    const [user, setUser] = useState({cname:'' ,type:'',industry:'',supervisor:'',jobDescrip:'',ppo:'',status:'',paid:'',feedback:''})

    const handleChange = (e) => {
        const {name , value} = e.target
        setUser({...user,[name]:value})
    }


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            let id
            if(token){
                const decoded = jwt_decode(token)
                id = decoded.user.id
            }
            const userWithId = {...user,id:id}

            const company = localStorage.getItem('company')
            let c_id
            if(token){
                const decoded = jwt_decode(company)
                c_id = decoded.user.id
            }
            const companyWithId = {...userWithId,c_id:c_id}

            const response = await fetch('http://localhost:3000/dashboard/internship', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyWithId),
          });
          const data = await response.json()
          if(response.ok){
            console.log(data.internship)
            navigate('/dashboard')
          }else{
            console.log(data.message)
          }
          
        } catch (error) {
          console.error('Error:', error)
        }
        setLoading(false)
      }


//Display ELements here

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
        <div className="wrapperFORM">

            <form onSubmit={handleSubmit}>
            <ul>
                <center><h1>Internship Details</h1></center>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Company Name : </span>
                        <input type="text" name="cname" value={user.cname} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Internship Type : </span>
                        <input type="text" name="type" value={user.type} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Industry Type : </span>
                        <input type="text" name="industry" value={user.industry} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Supervisor Name : </span>
                        <input type="email" name="supervisor" value={user.supervisor} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Internship Description : </span>
                        <textarea className='txtarea' type="text" name="jobDescrip" value={user.jobDescrip} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Pre-Placement Offer :
                        <input 
                        className='radio'
                        type='radio' 
                        name='ppo'
                        onChange={handleChange} 
                        value="Yes"/><span className='opt'>Yes{"  "}</span>
                        <input 
                        className='radio'
                        type='radio' 
                        name='ppo'
                        onChange={handleChange} 
                        value="No"/><span className='opt'>No</span>
                        </span>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Internship Status :
                        <input 
                        className='radio'
                        type='radio' 
                        name='status'
                        onChange={handleChange} 
                        value="Completed"/><span className='opt'>Completed{"  "}</span> 

                        <input 
                        className='radio'
                        type='radio' 
                        name='status'
                        onChange={handleChange} 
                        value="Ongoing"/><span className='opt'>Ongoing</span>
                        </span>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Internship Payment Type :
                        <input 
                        className='radio'
                        type='radio' 
                        name='paid'
                        onChange={handleChange} 
                        value="Paid"/><span className='opt'>Paid{"  "}</span>

                        <input 
                        className='radio' 
                        type='radio' 
                        name='paid'
                        onChange={handleChange} 
                        value="Unpaid"/><span className='opt'>Unpaid</span>
                        </span>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Feedback : </span>
                        <input type="text" name="feedback" value={user.feedback} onChange={handleChange}/>
                    </div>
                </li>
                <center>
                    <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
                </center>
            </ul>
            </form>
        </div>)
        }
        </div>
    )
}

export default Internship