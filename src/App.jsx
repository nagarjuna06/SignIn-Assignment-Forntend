import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignIn from "./Components/signInRoute";
import "./App.css";
import Home from './Components/Home';
import {ProtectedRoute,Authenticated} from './Components/protectedRoute';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/signIn' element={<Authenticated Component={SignIn}/>}/>
      <Route exact path='/' element={<ProtectedRoute Component={Home}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App