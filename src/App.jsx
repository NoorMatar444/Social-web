import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Login from "./Login/Login ";
import NotFound from "./NotFound/NotFound";
import LoginContextProvider from "./Context/LoginContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from './PostDetails/PostDetails';
const query = new QueryClient();
let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "PostDetails/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={query}>
        <LoginContextProvider>
          <RouterProvider router={x}></RouterProvider>
        </LoginContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
