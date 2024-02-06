// import { redirect } from "react-router-dom";

const sessionLoader = async (apiService) => {
  const loaderData = { preloadUser: null };

  try {
    if (!localStorage.getItem("token")) {
      return loaderData;
    }

    const data = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
    );
    loaderData.preloadUser = data;
  } catch (err) {
    // return redirect("/slideone");
    localStorage.clear();
  }
  return loaderData;
};

export default sessionLoader;
