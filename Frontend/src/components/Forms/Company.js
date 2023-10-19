import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import jwt_decode from 'jwt-decode'
import '../Signup.css'


const Company = () =>{
    const [Loading, setLoading]=useState(false)

    const [user, setUser] = useState({name:'' ,location:'',industry:'',cemail:'',cphn:''})

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

            const response = await fetch('http://localhost:3000/dashboard/company', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userWithId),
          });
          const data = await response.json()
          if(response.ok){
            console.log(data.company)
            console.log(data.token)
            localStorage.setItem('company',data.token)
            navigate('/dashboard/internship')
          }else{
            console.log(data.message)
          }
          
        } catch (error) {
          console.error('Error:', error)
        }
        setLoading(false)
      }

      const goback=(e)=>{
        e.preventDefault()
        navigate('/dashboard')
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
                <center><h1>Company Details</h1></center>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Company Name : </span>
                        <input type="text" name="name" value={user.name} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Location : </span>
                        <input type="text" name="location" value={user.location} onChange={handleChange}/>
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
                        <span className='bx bxs-user'>Company Email : </span>
                        <input type="email" name="cemail" value={user.cemail} onChange={handleChange}/>
                    </div>
                </li>
                <li>
                    <div className="input-box">
                        <span className='bx bxs-user'>Contact No. : </span>
                        <input type="text" name="cphn" value={user.cphn} onChange={handleChange}/>
                    </div>
                </li>
                <center>
                    <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
                    <button type="submit" className="btn" onClick={goback}>Go Back</button>
                </center>
            </ul>
            </form>
        </div>)
        }
        </div>
    )
}

export default Company