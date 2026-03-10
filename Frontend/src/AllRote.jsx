import { createBrowserRouter } from 'react-router-dom'
import  Login  from './feature/auth/pages/Login'
import Register from './feature/auth/pages/Register'
import Dashboard from './Dashboard'
 export const user = createBrowserRouter([
     {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Dashboard/>
    }
 ])