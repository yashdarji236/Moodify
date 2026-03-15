import React from 'react'

import { AuthProvider } from './feature/auth/authContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './AllRote'
import { SongContextProvider } from './feature/Home/Context'
const App = () => {
  return (
    <>
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>
      </AuthProvider>
    </>
  )
}

export default App
