import React from 'react'

import { AuthProvider } from './feature/auth/authContext'
import { RouterProvider } from 'react-router-dom'
import { user } from './AllRote'
const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={user}/>
      </AuthProvider>
    </>
  )
}

export default App
