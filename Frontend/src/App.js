import React, {useCallback,useState} from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import Navigation from './Navigation';
import Form from './components/Form';
import {AuthContext} from './context/auth-context'
import './App.css'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard/form" element={<Form/>}/>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
    );
  }



  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Navigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

