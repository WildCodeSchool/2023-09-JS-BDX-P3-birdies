import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
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
import UserSettings from "./pages/UserSettings";
import ApiService from "./services/api.service";
// import AdminEditUser from "./pages/AdminEditUser";

const apiService = new ApiService();

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      try {
        const data = await apiService.get(`http://localhost:3310/api/users/me`);
        return { preloadUser: data ?? null };
      } catch (err) {
        return { preloadUser: null };
      }
    },
    element: <InfoContextProvider apiService={apiService} />,
    children: [
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
        loader: async () => {
          try {
            const data = await apiService.get(
              `http://localhost:3310/api/users/me`
            );
            if (data.role === "user") {
              return redirect("/user");
            }
          } catch (err) {
            return redirect("/login");
          }
          return null;
        },
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
        loader: async () => {
          try {
            const data = await apiService.get(
              `http://localhost:3310/api/users/me`
            );
            if (data.role === "user") {
              return redirect("/");
            }
          } catch (err) {
            return redirect("/login");
          }
          return null;
        },

        element: (
          <AdminContextProvider>
            <Admin />
          </AdminContextProvider>
        ),
      },
      {
        path: "/UserSettings/:id",
        element: <UserSettings />,
      },
      // {
      //   path: "/AdminEditUser",
      //   element: (
      //     <AdminContextProvider>
      //       <AdminEditUser />
      //     </AdminContextProvider>
      //   ),
      // },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
