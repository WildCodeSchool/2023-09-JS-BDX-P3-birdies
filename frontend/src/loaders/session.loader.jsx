// import { redirect } from "react-router-dom";

const sessionLoader = async (apiService) => {
  try {
    const data = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
    );
    return { preloadUser: data ?? null };
  } catch (err) {
    // return redirect("/slideone");
    return { preloadUser: null };
  }
};

export default sessionLoader;
