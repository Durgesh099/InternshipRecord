import React , {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { AuthContext } from '../context/auth-context'

const Login = () =>{

    const [user, setUser] = useState({email:'' ,pass:''})

    const handleChange = (e) => {
        const {name , value} = e.target
        setUser({...user,[name]:value})
    }


    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
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
              console.log(data.message)
              navigate('/dashboard')
              return auth.login()
          }else{
            console.log(data.error)
          }
          
        } catch (error) {
          console.error('Error:', error)
        }

      }


      const loginDisable = !user.email || !user.pass

//Display ELements here

    return(
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
        </div>
    )
}

export default Login