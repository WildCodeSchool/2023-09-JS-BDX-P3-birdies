import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import ApiService from "../services/api.service";

const InfoContext = createContext();

function Average(array) {
  const iniVal = 0;
  const NoteSum = array.reduce((acc, value) => value + acc, iniVal);
  const avNote = NoteSum / array.length;
  const roundedNote = avNote.toFixed(1);
  return roundedNote;
}

export function InfoContextProvider({ apiService }) {
  const navigate = useNavigate();
  const { preloadUser } = useLoaderData();
  const [userId, setUserId] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // les infos de l'utilisateur connecté;
  const [user, setUser] = useState(
    preloadUser?.data?.role ? preloadUser.data : { role: "visitor" }
  );
  const [popupContent, setPopupContent] = useState("");
  // ou l'on stock le commentaire & la note d'une recette
  const [recipeNote, setRecipeNote] = useState("");
  const [recipeComment, setRecipeComment] = useState("");
  // ou l'on stock le texte de recherche de recette
  const [inputSearchValue, setInputSearchValue] = useState("");
  // ou l'on stock les recettes favorites entieres
  const [favoriteRecipesComplete, setFavoriteRecipesComplete] = useState([]);
  // ou l'on stock les id des recettes favorites
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // où l'on stock la recette choisie
  const [chosenRecipe, setChosenRecipe] = useState({});
  // valeur de l'alerte pour post de commentaire
  const [basicSuccess, setBasicSuccess] = useState(false);
  // où l'on stock les filtres cathégories des recettes
  const [chosenFilters, setChosenFilters] = useState([]);
  const [lastRecipes, setLastRecipes] = useState([]);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [infoLogin, setInfoLogin] = useState(false);
  const [userPicture, setUserPicture] = useState();
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [getData, setGetData] = useState([]);
  const [getDataName, setGetDataName] = useState([]);
  const [getDataDifficulty, setGetDataDifficulty] = useState([]);
  const [valueDifficulty, setValueDifficulty] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  const [foodDifficulty, setFoodDiddiculty] = useState("");
  console.info(foodDifficulty);
  const [cathegories, setCathegories] = useState([]);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [errorOrigin, setErrorOrigin] = useState("");
  const [formatError, setFormatError] = useState("");
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState();
  const [recipePicture, setRecipePicture] = useState("");
  const [userByRecipe, setUserByRecipe] = useState([]);

  // recupere toutes les cathegories de filtres
  useEffect(() => {
    const getCathegories = async () => {
      try {
        const cath = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cathegories`
        );
        setCathegories(cath.data);
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    getCathegories();
  }, []);

  // supprimer le message d'erreur d'IDs incorrects dès que l'on retente quelque chose
  useEffect(() => {
    if (formValue.password || formValue.email) {
      setPasswordError(false);
    }
    if (checkPassword !== "" || formValue.password !== "") {
      setNoMatchPassword(false);
    }
    if (formValue.pseudo) {
      setFormatError("");
    }
  }, [formValue.password, formValue.email, formValue.pseudo, checkPassword]);

  // formats valides en format regex
  const validPseudo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const validPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

  const handleLoginSubmit = async (credentials) => {
    try {
      const data = await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        credentials
      );
      localStorage.setItem("token", data.token);
      apiService.setToken(data.token);
      const result = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
      );

      setInfoLogin((prev) => !prev);
      setUser(result.data);
      setFormValue({ email: "", password: "", role: "user" });
      setPasswordError(false);
      if (result.data.role === "admin") {
        return navigate("/admin");
      }
      return navigate("/");
    } catch (err) {
      console.error(err);
      setFormValue({
        pseudo: "",
        email: "",
        password: "",
        role: "user",
      });
      setCheckPassword("");
      setPasswordError(true);
    }
    return null;
  };

  const createUser = async (credentials) => {
    try {
      const { newData } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        credentials
      );
      console.info(`this is : ${newData}`);
      const newCredentials = {
        email: credentials.email,
        password: credentials.password,
      };
      handleLoginSubmit(newCredentials);
    } catch (err) {
      const errorKind = err.response.data.error;
      const inputError = errorKind
        .replace("'", " ")
        .split(".")[1]
        .split(" ")[0];
      const errorMsg = inputError.replace("'", "");
      setFormValue({ ...formValue, [errorMsg]: "" });
      setCheckPassword("");
      setErrorOrigin(errorMsg);
    }
    return null;
  };

  const logout = () => {
    setUser({ role: "visitor" });
    localStorage.clear();
    return navigate("/slideone");
  };

  const getLastRecipes = async (number) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lastRecipes/${number}`
      );
      setLastRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLastRecipes(5);
  }, []);

  const fetchUserRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3310/api/users/${user.email}/userRecipes`
      );
      setUserByRecipe(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getRecipePicture = async (recipePictureId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/uploads/${recipePictureId})`
    );
    setRecipePicture(response.data);
  };

  const getRecipeByID = async (id) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}`
    );
    setChosenRecipe(res.data);
  };
  // permet de recuperer des recettes par filtre ou texte
  const getChosenrecipes = async (word, difficulty) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/recipes?name=${word}&difficulty=${difficulty}`
      );
      setGetData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.info(getData);
  useEffect(() => {
    getChosenrecipes(inputSearchValue, foodDifficulty);
  }, [inputSearchValue, foodDifficulty]);

  const getRecipesDifficulty = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${valueDifficulty}`
      );
      setGetDataName(response.data);
    } catch (err) {
      console.error(err.response.data);
      setGetDataName();
    }
  };
  const handleSubmitSteps = async (id, credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}/steps`,
        credentials
      );
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteSteps = async (recipeId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${recipeId}/steps`
    );
    return response;
  };
  // recherche si un ingredient existe dans la table sinon le rajoute
  const handleSubmitIngredients = async (element) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/ingredients/${element}`
      );
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  // ajoute un ingredient à la table de jonction recipe_ingredient
  const handleSubmitRecipeIngredients = async (
    recipeId,
    ingredientId,
    product
  ) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/recipesIngredients/${recipeId}/${ingredientId}`,
        product
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const handleSubmitRecipeCathegories = async (id, array) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}/cathegories`,
        array
      );
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteRecipeIngredients = async (id) => {
    try {
      const deletedRecipes = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipesIngredients/${id}`
      );
      return deletedRecipes;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const handleUpdateRecipe = async (data, recipeId) => {
    try {
      const updatedRecipe = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/recipe/${recipeId})`,
        data
      );
      console.info(updatedRecipe);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleSubmitPicture = async (id, data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}/uploads`,
        data
      );
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const postComment = async (evaluation) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/evaluations`,
        evaluation
      );
    } catch (err) {
      console.error(err);
    }
  };

  function filterListModify(e) {
    const targetedFilter = e.target.innerText;
    if (foodFilter.includes(targetedFilter)) {
      setFoodFilter(foodFilter.filter((spec) => spec !== targetedFilter));
    } else {
      setFoodFilter([...foodFilter, targetedFilter]);
    }
  }

  // donne la liste de toutes les recettes favorites de l'utilisateur
  useEffect(() => {
    const showFavorites = async (person) => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${person.id}/userRecipes`
      );
      const favs = response.data;
      setFavoriteRecipesComplete(favs);
      const favoritesIds = favs.map((fav) => parseInt(fav.recipe_id, 10));
      setFavoriteRecipes(favoritesIds);
    };
    showFavorites(user);
  }, []);

  console.info(favoriteRecipesComplete);

  function difficultyListModify(e) {
    const targetedDifficulty = e.target.innerText;
    if (foodDifficulty === targetedDifficulty) {
      setFoodDiddiculty("");
    } else {
      setFoodDiddiculty(targetedDifficulty);
    }
  }

  // modifie la valeur de la recherche de la barre de recherche
  function handleChangeSearch(e) {
    setInputSearchValue(e.target.value);
  }

  // ajoute la note lors de l'évaluation d'une recette
  function HandleRecipeNote(e) {
    const avis =
      e.target.value === undefined
        ? e.target.getAttribute("data-value")
        : e.target.value;
    if (recipeNote === avis) {
      setRecipeNote("");
    } else {
      setRecipeNote(avis);
    }
  }
  // stock le texte du commentaire d'une recette
  function handleChangeComment(e) {
    setRecipeComment(e.target.value);
  }

  // ajoute ou enlève une recette des favoris
  const handleChangeFavorite = (e) => {
    if (favoriteRecipes.includes(e.target.value)) {
      setFavoriteRecipes(
        favoriteRecipes.filter((recipe) => recipe !== e.target.value)
      );
    } else {
      setFavoriteRecipes([...favoriteRecipes, e.target.value]);
    }
  };
  // gere les recettes favorites (ajout/suppression/stock en states)
  const manageFavoriteRecipes = async (e) => {
    const answer = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/${
        user.id
      }/favoriteRecipes/${e.target.value}`
    );
    const userFavoriteRecipes = answer.data;
    setFavoriteRecipesComplete(userFavoriteRecipes);
    const favoriteIds = userFavoriteRecipes.map(
      (userFavorite) => userFavorite.recipe_id
    );
    setFavoriteRecipes(favoriteIds);
  };

  function convertMinutesToTime(value) {
    const timeAsANumber = parseInt(value, 10);
    const hours = Math.floor(timeAsANumber / 60);
    const minutes =
      timeAsANumber % 60 < 10 ? `0${timeAsANumber % 60}` : timeAsANumber % 60;
    return `${hours} h ${minutes}`;
  }
  // Définit la date au format JJ/MM/AAAA H:MM
  const displayDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes();
    return `${date}/${month}/${year}  ${hours}:${min}`;
  };

  function sendEvaluation() {
    const commentContent = {
      userId: user.id,
      commentMessage: recipeComment,
      commentNote: recipeNote,
      commentDate: displayDate(),
      recipeId: currentRecipeId,
    };

    postComment(commentContent);
    // window.location.reload(true);
    setRecipeComment("");
    setRecipeNote("");
    setAddCommentVisible(false);
    setBasicSuccess((prev) => !prev);
  }
  const contextValues = useMemo(
    () => ({
      Average,
      HandleRecipeNote,
      addCommentVisible,
      apiService,
      basicSuccess,
      cathegories,
      checkPassword,
      chosenRecipe,
      chosenFilters,
      setChosenFilters,
      convertMinutesToTime,
      createUser,
      currentRecipeId,
      difficultyListModify,
      displayDate,
      displayFilter,
      email,
      errorOrigin,
      favoriteRecipes,
      favoriteRecipesComplete,
      setFavoriteRecipesComplete,
      filterListModify,
      foodDifficulty,
      formValue,
      formatError,
      getData,
      getDataDifficulty,
      getDataName,
      getRecipeByID,
      getRecipePicture,
      handleChangeComment,
      handleChangeFavorite,
      handleChangeSearch,
      handleDeleteRecipeIngredients,
      handleDeleteSteps,
      handleLoginSubmit,
      handleSubmitRecipeCathegories,
      handleSubmitPicture,
      handleSubmitSteps,
      handleSubmitIngredients,
      handleSubmitRecipeIngredients,
      handleUpdateRecipe,
      infoLogin,
      infoSuccess,
      inputSearchValue,
      lastRecipes,
      setLastRecipes,
      logout,
      manageFavoriteRecipes,
      noMatchPassword,
      password,
      passwordError,
      popupContent,
      recipeComment,
      recipeNote,
      recipePicture,
      sendEvaluation,
      setAddCommentVisible,
      setBasicSuccess,
      setCheckPassword,
      setCurrentRecipeId,
      setDisplayFilter,
      setEmail,
      setErrorOrigin,
      setFavoriteRecipes,
      setFormValue,
      setFormatError,
      setGetDataDifficulty,
      setInfoLogin,
      setInfoSuccess,
      setInputSearchValue,
      setNoMatchPassword,
      setPassword,
      setPopupContent,
      setRecipeComment,
      setRecipeNote,
      setRecipePicture,
      setShowAllRecipes,
      setShowComments,
      setShowUserList,
      setUser,
      setUserId,
      setUserPicture,
      setValueDifficulty,
      showAllRecipes,
      showComments,
      showUserList,
      user,
      userId,
      userPicture,
      validEmail,
      validPassword,
      validPseudo,
      valueDifficulty,
      getRecipesDifficulty,
      setUserByRecipe,
      userByRecipe,
      fetchUserRecipes,
    }),
    [
      Average,
      HandleRecipeNote,
      addCommentVisible,
      apiService,
      basicSuccess,
      cathegories,
      checkPassword,
      chosenFilters,
      setChosenFilters,
      convertMinutesToTime,
      createUser,
      currentRecipeId,
      difficultyListModify,
      displayDate,
      displayFilter,
      email,
      errorOrigin,
      favoriteRecipes,
      favoriteRecipesComplete,
      setFavoriteRecipesComplete,
      filterListModify,
      foodDifficulty,
      formValue,
      formatError,
      getData,
      getDataDifficulty,
      getDataName,
      getRecipeByID,
      getRecipePicture,
      handleChangeComment,
      handleChangeFavorite,
      handleChangeSearch,
      handleDeleteRecipeIngredients,
      handleDeleteSteps,
      handleLoginSubmit,
      handleSubmitRecipeCathegories,
      handleSubmitIngredients,
      handleSubmitRecipeIngredients,
      handleSubmitPicture,
      handleSubmitSteps,
      handleUpdateRecipe,
      infoLogin,
      infoSuccess,
      inputSearchValue,
      lastRecipes,
      setLastRecipes,
      logout,
      manageFavoriteRecipes,
      noMatchPassword,
      password,
      passwordError,
      popupContent,
      recipeComment,
      recipePicture,
      sendEvaluation,
      setAddCommentVisible,
      setBasicSuccess,
      setCheckPassword,
      setCurrentRecipeId,
      setDisplayFilter,
      setEmail,
      setErrorOrigin,
      setFavoriteRecipes,
      setFormValue,
      setFormatError,
      setGetDataDifficulty,
      setInfoLogin,
      setInfoSuccess,
      setInputSearchValue,
      setNoMatchPassword,
      setPassword,
      setPopupContent,
      setRecipePicture,
      setShowAllRecipes,
      setShowComments,
      setShowUserList,
      setUser,
      setUserId,
      setUserPicture,
      setValueDifficulty,
      showAllRecipes,
      showComments,
      showUserList,
      user,
      userId,
      userPicture,
      validEmail,
      validPassword,
      validPseudo,
      valueDifficulty,
      getRecipesDifficulty,
      setUserByRecipe,
      userByRecipe,
      fetchUserRecipes,
    ]
  );
  return (
    <InfoContext.Provider value={contextValues}>
      <Outlet />
    </InfoContext.Provider>
  );
}

InfoContextProvider.propTypes = {
  apiService: PropTypes.instanceOf(ApiService).isRequired,
};

export const Useinfo = () => useContext(InfoContext);
