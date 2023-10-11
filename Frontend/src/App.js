import React, {useCallback,useState} from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import Navigation from './Navigation';
import {AuthContext} from './context/auth-context'
import './App.css'
import Admin from './components/Admin';
import AdminPage from './components/AdminPage'
import Internship from './components/Forms/Internship'
import Company from './components/Forms/Company'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const adminLogin = useCallback(()=>{
    setIsAdminLoggedIn(true)
  }, [])

  const adminLogout = useCallback(()=>{
    setIsAdminLoggedIn(false)
  }, [])

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard/company" element={<Company/>}/>
      </Routes>
    );
  }
  else if (isAdminLoggedIn){
    routes = (
      <Routes>
          <Route path="/adminPage" element={<AdminPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/" exact element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
    );
  }



  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout, 
        isAdminLoggedIn: isAdminLoggedIn ,adminLogin: adminLogin, adminLogout: adminLogout}}
    >
      <Router>
        <Navigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

