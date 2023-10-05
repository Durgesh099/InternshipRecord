import React , {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import './Login.css'
import { AuthContext } from '../context/auth-context'

const Login = () =>{
    const [Loading, setLoading]=useState(false)

    const [user, setUser] = useState({email:'' ,pass:''})

    const handleChange = (e) => {
        const {name , value} = e.target
        setUser({...user,[name]:value})
    }


    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
          const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          const data = await response.json()
          if(response.ok){
              localStorage.setItem('user',JSON.stringify(data.auth))
              console.log(data.message,data.auth)
              navigate('/dashboard')
              return auth.login()
          }else{
            console.log(data.error)
          }
          
        } catch (error) {
          console.error('Error:', error)
        }
        setLoading(false)
      }


      const loginDisable = !user.email || !user.pass

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
        <div className="wrapper">

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <span className='bx bxs-user'>Email : </span>
                    <input type="email" name="email" value={user.email} onChange={handleChange}/>
                </div>
                <div id="pass" className="input-box">
                    <span className='bx bxs-user'>Password : </span>
                    <input type="password" name="pass" value={user.pass} onChange={handleChange}/>
                </div>
                <div>
                    {!loginDisable && <button type="submit" className="btn" onClick={handleSubmit}>Login</button>}
                </div>
            </form>
        </div>)
        }
        </div>
    )
}

export default Login