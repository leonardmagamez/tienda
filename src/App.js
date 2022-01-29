import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import Home from './components/home/Home';
import Login from './components/login/Login';

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem('user');
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', auth);
  }, [auth]);

  return (
    <Container className='App'>
      <Routes>
        {auth && (
          <Route
            path='/'
            element={<Home autenticate={() => setAuth(false)} />}
          />
        )}
        {!auth && (
          <Route
            path='/login'
            element={<Login autenticate={() => setAuth(true)} />}
          />
        )}
        <Route path='*' element={<Navigate to={auth ? '/' : '/login'} />} />
      </Routes>
    </Container>
  );
};

export default App;
