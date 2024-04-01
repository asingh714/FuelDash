import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./utils/AuthContext";
import Home from "./Pages/Home/Home.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import DetailedReports from "./Pages/DetailedReports/DetailedReports.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Properties from "./Pages/Properties/Properties.jsx";
import Welcome from "./Pages/Welcome/Welcome.jsx";
import Products from "./Pages/Products/Products.jsx";
import TermsOfUse from "./Pages/TermsOfUse/TermsOfUse.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import SalesReports from "./Pages/SalesReports/SalesReports.jsx";

import "./styles/global.scss";
import About from "./Pages/About/About.jsx";
import Blog from "./Pages/Blog/Blog.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Customers from "./Pages/Customers/Customers.jsx";
import FAQs from "./Pages/FAQ/FAQ.jsx";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="main">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </AuthProvider>
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
          path: "/products",
          element: <Products />,
        },
        {
          path: "/dashboard",
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
        {
          path: "/sales-reports",
          element: <SalesReports />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        { path: "/contact", element: <Contact /> },
        { path: "/customers", element: <Customers /> },
        { path: "/faqs", element: <FAQs /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
