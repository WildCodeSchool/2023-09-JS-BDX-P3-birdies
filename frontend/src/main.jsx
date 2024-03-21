import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./styles/app.scss";
import axios from "axios";
import sessionLoader from "./loaders/session.loader";
import { AdminContextProvider } from "./context/AdminContext";
import { InfoContextProvider } from "./context/InfoContext";
import App from "./App";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import UserPage from "./pages/UserPage";
import NewRecipe from "./pages/NewRecipe";
import SlideOne from "./pages/slideOne page/SlideOne";
import SlideTwo from "./pages/SlideTwo";
import SlideThree from "./pages/SlideThree";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ModifyRecipe from "./pages/ModifyRecipe";
import ErrorPage from "./pages/errorPage";
import UserSettings from "./pages/UserSettings";
import ApiService from "./services/api.service";
import LostPassword from "./pages/LostPassword";
// import AdminEditUser from "./pages/AdminEditUser";

const apiService = new ApiService();

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => sessionLoader(apiService),
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
        loader: async ({ params }) => {
          const [response1, response2, response3, response4] =
            await Promise.all([
              axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${params.id}`
              ),
              axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/evaluations/${
                  params.id
                }`
              ),
              axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${
                  params.id
                }/steps`
              ),
              axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/recipesIngredients/${
                  params.id
                }`
              ),
            ]);
          return {
            recipe: response1.data,
            comments: response2.data,
            steps: response3.data,
            ingredients: response4.data,
          };
        },
        element: <Recipe />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/userpage",
        loader: async () => {
          try {
            const data = await apiService.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
            );
            if (data.role === "user") {
              return redirect("/userpage");
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
        loader: async ({ params }) => {
          const [response1, response2, response3] = await Promise.all([
            axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${params.id}`
            ),
            axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${
                params.id
              }/steps`
            ),
            axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/recipesIngredients/${
                params.id
              }`
            ),
          ]);
          return {
            recipeToModify: response1.data,
            steps: response2.data,
            ingredients: response3.data,
          };
        },
        element: <ModifyRecipe />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin",
        loader: async () => {
          try {
            const data = await apiService.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
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
      {
        path: "/lostPassword",
        element: <LostPassword />,
      },
    ],
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
