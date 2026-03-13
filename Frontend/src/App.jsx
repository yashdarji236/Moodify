import React from 'react'

import { AuthProvider } from './feature/auth/authContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './AllRote'
const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  )
}

export default App
