import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./Pages/Home/Home.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import "./styles/global.scss";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
