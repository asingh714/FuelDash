import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/Home/Home.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import TermsOfUse from "./Pages/TermsOfUse/TermsOfUse.jsx";
import DetailedReports from "./Pages/DetailedReports/DetailedReports.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Properties from "./Pages/Properties/Properties.jsx";
import Welcome from "./Pages/Welcome/Welcome.jsx";

import "./styles/global.scss";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="main">
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/properties",
          element: <Properties />,
        },
        {
          path: "/dashboard/:propertyId/:salesId",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/:propertyId/details/:detailedPage",
          element: <DetailedReports />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/welcome",
          element: <Welcome />,
        },
        {
          path: "/terms-of-use",
          element: <TermsOfUse />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
