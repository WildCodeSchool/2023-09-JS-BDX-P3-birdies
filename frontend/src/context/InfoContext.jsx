import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const InfoContext = createContext();

function Average(array) {
  const iniVal = 0;
  const NoteSum = array.reduce((acc, value) => value + acc, iniVal);
  const avNote = NoteSum / array.length;
  const roundedNote = avNote.toFixed(1);
  return roundedNote;
}

export function InfoContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupContent, setPopupContent] = useState(null);
  // ou l'on stock le commentaire & la note d'une recette
  const [recipeNote, setRecipeNote] = useState("");
  const [recipeComment, setRecipeComment] = useState("");
  // ou l'on stock le texte de recherche de recette
  const [inputSearchValue, setInputSearchValue] = useState("");
  // ou l'on stock les id des recettes favorites
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // valeur de l'alerte pour post de commentaire
  const [basicSuccess, setBasicSuccess] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const recipes = [
    {
      id: 1,
      name: "Paella",
      picture:
        "https://cdn.pixabay.com/photo/2014/02/13/18/52/wok-265566_1280.jpg",
      prepTime: "1h30",
      notes: [3, 5, 2, 4],
      difficulty: "Facile",
      peopleNumber: 4,
      ingredients: [
        {
          name: "riz",
          quantity: 300,
          mesure: "gr",
        },
        {
          name: "poulet",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "chorizo",
          quantity: 100,
          mesure: "gr",
        },
        {
          name: "crevettes",
          quantity: 100,
          mesure: "gr",
        },
        {
          name: "moules",
          quantity: 80,
          mesure: "gr",
        },
        {
          name: "bouilon de volaille",
          quantity: 300,
          mesure: "gr",
        },
        {
          name: "safran",
          quantity: 0.1,
          mesure: "gr",
        },
      ],
      steps: [
        {
          description: "eplucher les légumes",
        },
        {
          description: "cuire la viande",
        },
        {
          description: "ajouter les fruits de mer",
        },
        {
          description: "tout mélanger et c'est pret",
        },
      ],
      comments: [
        {
          userName: "Lily Jean",
          messageDate: "25 juillet 2023, 12:30",
          message: "Wow, vriment délicieux !",
        },
        {
          userName: "John Doe",
          messageDate: "12 février 2023, 11:45",
          message: "Ma fille à adoré, je recommande vraiment cette recette !",
        },
        {
          userName: "Marie Josée",
          messageDate: "15 janvier 2021, 11:45",
          message:
            "Quantité un peu juste pour 4 personnes mais sinon très bonne recette !",
        },
      ],
    },
    {
      id: 2,
      name: "Lasagnes",
      picture:
        "https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg",
      prepTime: "2h00",
      notes: [5, 5, 1, 3, 2, 4, 5],
      difficulty: "Moyenne",
      peopleNumber: 6,
      ingredients: [
        {
          name: "Pâte à lasagnes",
          quantity: 500,
          mesure: "gr",
        },
        {
          name: "Tomates",
          quantity: 1000,
          mesure: "gr",
        },
        {
          name: "viande hachée",
          quantity: 1500,
          mesure: "gr",
        },
        {
          name: "Oignons",
          quantity: 3,
          mesure: "pce",
        },
        {
          name: "lait",
          quantity: 1000,
          mesure: "ml",
        },
        {
          name: "Beurre",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "Farine",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "Thym",
          quantity: 3,
          mesure: "branche",
        },
        {
          name: "ail",
          quantity: 3,
          mesure: "gousse",
        },
      ],
      steps: [
        {
          description: "cuire la viande, les oignons ensemble et l'ail",
        },
        {
          description:
            "Saler, poivrer et ajouter les tomates concassées. Faire mijoter 45mn",
        },
        {
          description:
            "Préparer la béchamel : Chauffer le beurre et la farine, ajouter le lait chaud tout en remuant",
        },
        {
          description: "Sauce / Pate / Bechamel ===> repeat plein de fois",
        },
        {
          description:
            "rajouter le fromage on top qui n'est pas dans les ingrédients sa mère.",
        },
      ],
      comments: [
        {
          userName: "Damien Jean",
          messageDate: "25 juillet 2023, 12:30",
          message: "Wow, vriment délicieux !",
        },
        {
          userName: "John Doe",
          messageDate: "12 février 2023, 11:45",
          message: "Dégueu !",
        },
        {
          userName: "Marie Josée",
          messageDate: "15 janvier 2021, 11:45",
          message: "Ouais bof !",
        },
      ],
    },
    {
      id: 3,
      name: "Croziflette",
      picture:
        "https://tse3.mm.bing.net/th?id=OIP.LnTLfxtLjLaZEIlKOygengHaFj&pid=Api&P=0&h=180",
      prepTime: "50 min",
      notes: [3, 5, 2, 4],
      difficulty: "facile",
      peopleNumber: 4,
      ingredients: [
        {
          name: "roblochon",
          quantity: 300,
          mesure: "gr",
        },
        {
          name: "crème fraiche",
          quantity: 20,
          mesure: "cl",
        },
        {
          name: "lardons",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "crozet au sarrazin",
          quantity: 300,
          mesure: "gr",
        },
        {
          name: "moules",
          quantity: 80,
          mesure: "gr",
        },
        {
          name: "oignons",
          quantity: 1,
          mesure: "",
        },
      ],
      steps: [
        {
          description: "eplucher les légumes",
        },
        {
          description: "cuire la viande",
        },
        {
          description:
            "Faire cuire les crozets dans l'eau bouillante salée pendant 20 minutes.",
        },
        {
          description:
            "Mettre les oignons de coté et faire revenir les lardons",
        },
        {
          description:
            "Mettre les oignons cuits lardons crème dans la poêle et faire réduire",
        },
        {
          description: "Égoutter les crozets",
        },
        {
          description:
            "Mettre dans le plat à gratin une couche de crozet, une couche de crème/lardons/oignons.",
        },
        {
          description:
            "Remplir le plat de cette manière et mettre au-dessus le reblochon coupé en 2.",
        },
        {
          description: "Faire cuire au four pendant 20 minutes à 200°C.",
        },
      ],
      comments: [
        {
          userName: "Lily Jean",
          messageDate: "25 juillet 2023, 12:30",
          message: "Wow, vriment délicieux !",
        },
        {
          userName: "John Doe",
          messageDate: "12 février 2023, 11:45",
          message:
            "N'hésitez pas à assaisonner votre recette. Elle sera bien meilleure.",
        },
        {
          userName: "Marie Josée",
          messageDate: "15 janvier 2021, 11:45",
          message: "Super Bon le top",
        },
      ],
    },
  ];
  const evaluations = [
    {
      value: 1,
      image: "*",
      word: "Bof",
    },
    {
      value: 2,
      image: "**",
      word: "Passable",
    },
    {
      value: 3,
      image: "***",
      word: "miam !",
    },
    {
      value: 4,
      image: "****",
      word: "Delicious !",
    },
    {
      value: 5,
      image: "*****",
      word: "Amaaazing !",
    },
  ];
  const difficulties = [
    {
      id: 1,
      name: "Très facile",
    },
    {
      id: 2,
      name: "Facile",
    },
    {
      id: 3,
      name: "Moyenne",
    },
    {
      id: 4,
      name: "Difficile",
    },
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      pseudo: "Rikiki",
      name: "Victor",
      email: "vivi@outlook.com",
      password: "blablabla",
    },
    {
      id: 2,
      pseudo: "Davidou",
      name: "David",
      email: "davidou@outlook.com",
      password: "blobloblo",
    },
    {
      id: 3,
      pseudo: "Sysy",
      name: "Sylvain",
      email: "sysylimperatrice@outlook.com",
      password: "bliblibli",
    },
  ]);
  const recipesPepites = [
    {
      id: 1,
      name: "Gigot de 7 heures",
      picture:
        "https://gourmandiz.dhnet.be/wp-content/uploads/2018/05/050618RECETTE3PVDA-690x388.jpg",
      prepTime: "7h ",
      notes: [3, 5, 2, 4],
      difficulty: "facile",
      peopleNumber: 4,
      ingredients: [
        {
          name: "1/2gigot d'agneau",
          quantity: 2500,
          mesure: "gr",
        },
        {
          name: " couennes",
          quantity: 100,
          mesure: "gr",
        },
        {
          name: " carottes",
          quantity: 80,
          mesure: "gr",
        },
        {
          name: " tomates pelées et épépinées",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "bouquet garni (thym, laurier, persil, romarin)",
          quantity: 0.5,
          mesure: "",
        },
        {
          name: "12clde bouillon de boeuf ou de volaille",
          quantity: 12,
          mesure: "cl",
        },
        {
          name: "huile d'olive",
          quantity: 4,
          mesure: "cl",
        },
        {
          name: " cognac",
          quantity: 4,
          mesure: "cl",
        },
        {
          name: "vin blanc",
          quantity: 20,
          mesure: "cl",
        },
      ],
      steps: [
        {
          description:
            "Saler et poivrer le gigot, le faire revenir dans de l’huile chaude",
        },
        {
          description:
            "Tapisser de couennes le fond d’une cocotte en mettant le gras vers l’extérieur. Y déposer le gigot, entourer des carottes, des oignons et des tomates. Ajouter le reste des ingrédients, saler et poivrer.",
        },
        {
          description:
            "Faire cuire 7 h au four à 120-140 °C. Surveiller la cuisson et rajouter de l’eau si nécessaire.",
        },
        {
          description:
            "Rectifier l’assaisonnement et servir à la cuillère dans la cocotte. La particularité de ce gigot est d’être fondant au point qu’on puisse le couper à la cuillère.",
        },
      ],
      comments: [
        {
          userName: "Lily Jean",
          messageDate: "25 juillet 2023, 12:30",
          message: "Wow, vriment délicieux !",
        },
        {
          userName: "John Doe",
          messageDate: "12 février 2023, 11:45",
          message:
            "N'hésitez pas à assaisonner votre recette. Elle sera bien meilleure.",
        },
        {
          userName: "Marie Josée",
          messageDate: "15 janvier 2021, 11:45",
          message: "Super Bon le top",
        },
      ],
    },
    {
      id: 2,
      name: "Langouste Grillées",
      picture:
        "https://www.audreycuisine.fr/wp-content/uploads/2020/12/shutterstock_1668087205-1320x881.jpg",
      prepTime: "10 min",
      notes: [3, 5, 2, 4],
      difficulty: "facile",
      peopleNumber: 4,
      ingredients: [
        {
          name: "queues de langoustes",
          quantity: 4,
          mesure: "",
        },
        {
          name: "  beurre demi-sel",
          quantity: 40,
          mesure: "gr",
        },
        {
          name: " citron vert",
          quantity: 2,
          mesure: "",
        },
        {
          name: "  pincée de safran",
          quantity: 0.2,
          mesure: "gr",
        },
        {
          name: "gousses d’ail",
          quantity: 2,
          mesure: "",
        },
        {
          name: " morceau de gingembre",
          quantity: 1,
          mesure: "",
        },
        {
          name: "Piment d’Espelette",
          quantity: 8,
          mesure: "gr",
        },
      ],
      steps: [
        {
          description:
            "Laisser les langoustes décongeler au réfrigérateur selon les indications du paquet.",
        },
        {
          description:
            "A l’aide d’une râpe microplane, râper l’ail et le gingembre.",
        },
        {
          description:
            "Mélanger le beurre ramolli avec l’ail et le gingembre. Ajouter le safran et le zeste d’un demi citron vert râpé.",
        },
        {
          description:
            "Fendre les queues de langoustes en deux, les déposer sur la lèche-frite du four. Garnir généreusement les langoustes avec des morceaux de beurre parfumé.",
        },
        {
          description:
            "Préchauffer le four à 180° en mode chaleur tournante et grill combiné. Enfourner pour 12 minutes de cuisson.",
        },
        {
          description:
            "Quand les langoustes sont cuites, ajouter un filet de jus de citron vert et un peu de coriandre ciselée. Servir avec le beurre de cuisson et l’accompagnement de votre choix.",
        },
      ],
      comments: [
        {
          userName: "Lily Jean",
          messageDate: "25 juillet 2023, 12:30",
          message: "Wow, vriment délicieux !",
        },
        {
          userName: "John Doe",
          messageDate: "12 février 2023, 11:45",
          message:
            "N'hésitez pas à assaisonner votre recette. Elle sera bien meilleure.",
        },
        {
          userName: "Marie Josée",
          messageDate: "15 janvier 2021, 11:45",
          message: "Super Bon le top",
        },
      ],
    },
    {
      id: 3,
      name: "Entrecôte bordelaise",
      picture:
        "https://tse3.mm.bing.net/th?id=OIP.IS1uFd78fzfTYNew17UAZAHaEK&pid=Api&P=0&h=180",
      prepTime: "10 min",
      notes: [3, 5, 2, 4],
      difficulty: "facile",
      peopleNumber: 4,
      ingredients: [
        {
          name: "Entrecôte",
          quantity: 400,
          mesure: "gr",
        },
        {
          name: "  Echalote(s) grise(s)",
          quantity: 3,
          mesure: "",
        },
        {
          name: " Beurre doux",
          quantity: 20,
          mesure: "gr",
        },
        {
          name: "  Moëlle",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "Cube(s) de bouillon de viande",
          quantity: 10,
          mesure: "gr",
        },
        {
          name: " Farine de blé",
          quantity: 10,
          mesure: "gr",
        },
        {
          name: "Vin rouge",
          quantity: 27,
          mesure: "cl",
        },
      ],
      steps: [
        {
          description: "Éplucher et ciseler finement les échalotes.",
        },
        {
          description:
            "Dans une poêle chaude, verser un trait d'huile d'arachide puis cuire les entrecôtes assaisonnées de sel fin. En fin de cuisson, ajouter une noisette de beurre puis arroser la viande, la laisser à feu doux pendant 3 min. La débarrasser ensuite sur un morceau de papier aluminium, puis l'assaisonner de poivre du moulin.",
        },
        {
          description:
            "Dans la même poêle, faire suer les échalotes. Saupoudrer de farine, bien remuer puis ajouter le vin rouge, le cube de bouillon de viande avec 30 cl d'eau, le poivre et la branche de thym. Laisser réduire d'au moins 1/3. Ajouter ensuite la moelle puis baisser le feu.",
        },
        {
          description: "Servir la viande arrosée de sauce.",
        },
      ],
      comments: [
        {
          userName: "Lily Jean",
          messageDate: "25 juillet 2023, 12:30",
          message: "Wow, vriment délicieux !",
        },
        {
          userName: "John Doe",
          messageDate: "12 février 2023, 11:45",
          message:
            "N'hésitez pas à assaisonner votre recette. Elle sera bien meilleure.",
        },
        {
          userName: "Marie Josée",
          messageDate: "15 janvier 2021, 11:45",
          message: "Super Bon le top",
        },
      ],
    },
  ];

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

  function sendComment(e) {
    const commentId = e.target.getAttribute("data-value");
    const commentContent = [
      {
        userId: "????",
      },
      {
        commentDate: displayDate(),
      },
      {
        RecipeId: commentId,
      },
      {
        commentMessage: recipeComment,
      },
      {
        CommentNote: recipeNote,
      },
    ];
    console.info(commentContent);
    setRecipeComment("");
    setRecipeNote("");
    setBasicSuccess((prev) => !prev);
  }

  const contextValues = useMemo(
    () => ({
      recipes,
      difficulties,
      evaluations,
      handleChangeSearch,
      HandleRecipeNote,
      recipeNote,
      setRecipeNote,
      handleChangeComment,
      handleChangeFavorite,
      recipeComment,
      inputSearchValue,
      setInputSearchValue,
      favoriteRecipes,
      setFavoriteRecipes,
      basicSuccess,
      setBasicSuccess,
      infoSuccess,
      setInfoSuccess,
      setRecipeComment,
      sendComment,
      displayDate,
      users,
      setUsers,
      email,
      setEmail,
      password,
      setPassword,
      setPopupContent,
      Average,
      recipesPepites,
      popupContent,
    }),
    [
      recipes,
      evaluations,
      HandleRecipeNote,
      difficulties,
      evaluations,
      handleChangeSearch,
      HandleRecipeNote,
      handleChangeComment,
      handleChangeFavorite,
      recipeComment,
      inputSearchValue,
      setInputSearchValue,
      favoriteRecipes,
      setFavoriteRecipes,
      basicSuccess,
      setBasicSuccess,
      infoSuccess,
      setInfoSuccess,
      sendComment,
      displayDate,
      users,
      email,
      setEmail,
      password,
      setPassword,
      popupContent,
      Average,
      recipesPepites,
      Average,
      recipesPepites,
      setPopupContent,
    ]
  );

  return (
    <InfoContext.Provider value={contextValues}>
      {children}
    </InfoContext.Provider>
  );
}

InfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Useinfo = () => useContext(InfoContext);
