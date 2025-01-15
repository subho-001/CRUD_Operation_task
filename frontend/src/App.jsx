import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpList from './components/EmpList'
import CreateEmployee from './components/CreateEmployee'
import EditEmployee from './components/EditEmployee'
import EmployeeDetail from './components/EmployeeDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<EmpList/>}
        />
        <Route path='/create_emp' element={<CreateEmployee/>}/>

        <Route path="/edit_employee/:id" element={<EditEmployee/>} />
        <Route path="/view_employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
