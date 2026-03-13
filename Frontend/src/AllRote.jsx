import { createBrowserRouter } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Dashboard from "./Dashboard";
import Protected from "./feature/auth/Component/Protected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    )
  }
]);