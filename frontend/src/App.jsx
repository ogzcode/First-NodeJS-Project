import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import { getProjectToken, getProjectUser } from './services/token'

import Login from './views/auth/Login'
import Dashboard from './views/admin/Dashboard'
import Employee from './views/admin/Employee'
import Layout from './views/admin/Layout'

function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(getProjectUser())
    setToken(getProjectToken())
  }, [])


  const getRoutes = () => {
    if (token && user.role === 'admin') {
      return (
        <>
          <Route path='*' element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/*" element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='employee' element={<Employee />} />
            <Route path='project' element={<Dashboard />} />
            <Route path='time-off' element={<Dashboard />} />
            <Route path='settings' element={<Dashboard />} />
            <Route path='*' element={<Navigate to="/admin/dashboard" />} />
          </Route></>
      )
    } else if (token && user.role === 'employee') {
      return (
        <Route path="/employee/*" element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='time-off' element={<Dashboard />} />
          <Route path='settings' element={<Dashboard />} />
        </Route>
      )
    }
    else if (token && user.role === 'manager') {
      return (
        <Route path="/manager/*" element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='time-off' element={<Dashboard />} />
          <Route path='settings' element={<Dashboard />} />
        </Route>
      )
    }
    else {
      return (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Navigate to="/login" />} />
        </>

      )
    }
  }
  return (
    <Routes>
      {
        getRoutes()
      }
    </Routes>
  )
}

export default App
