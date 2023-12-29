import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./styles/app.scss";
import App from "./App";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import UserPage from "./pages/UserPage";
import NewRecipe from "./pages/NewRecipe";
import SlideOne from "./pages/slideOne page/SlideOne";
import SlideTwo from "./pages/SlideTwo";
import SlideThree from "./pages/SlideThree";
import { InfoContextProvider } from "./context/InfoContext";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { AdminContextProvider } from "./context/AdminContext";
import ModifyRecipe from "./pages/ModifyRecipe";
import ErrorPage from "./pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recipes/:id",
    element: <Recipe />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userpage",
    element: <UserPage />,
  },
  {
    path: "/newrecipe",
    element: <NewRecipe />,
  },
  {
    path: "/modifyrecipes/:id",
    element: <ModifyRecipe />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/slideone",
    element: <SlideOne />,
  },
  {
    path: "/slidetwo",
    element: <SlideTwo />,
  },
  {
    path: "/slidethree",
    element: <SlideThree />,
  },
  {
    path: "/admin",
    element: (
      <AdminContextProvider>
        <Admin />
      </AdminContextProvider>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <InfoContextProvider>
      <RouterProvider router={router} />
    </InfoContextProvider>
  </React.StrictMode>
);
