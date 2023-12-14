import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import lasagnes from "../styles/icons/lasagnes.jpg";

const InfoContext = createContext();

export function InfoContextProvider({ children }) {
  const [recipeNote, setRecipeNote] = useState("");
  const recipes = [
    {
      id: 1,
      name: "Paella",
      picture: "",
      prepTime: "1h30",
      notes: [3, 5, 2, 5, 4],
      difficulty: "facile",
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
    },
    {
      id: 2,
      name: "Lasagnes",
      picture: { lasagnes },
      prepTime: "2h00",
      notes: [5, 5, 1, 3, 2, 4, 5],
      difficulty: "Moyen",
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
    },
  ];
  const evaluations = [
    {
      image: "*",
      word: "Bof",
    },
    {
      image: "**",
      word: "Passable",
    },
    {
      image: "***",
      word: "miam !",
    },
    {
      image: "****",
      word: "Delicious !",
    },
    {
      image: "*****",
      word: "Amaaazing !",
    },
  ];
  const [users, setUsers] = useState([
    {
      id: 1,
      pseudo: "Rikiki",
      name: "Victor",
      email: "vivi@outlook.com",
      password: "123soleil",
    },
    {
      id: 2,
      pseudo: "Davidou",
      name: "David",
      email: "davidou@outlook.com",
      password: "123lune",
    },
    {
      id: 3,
      pseudo: "Sysy",
      name: "Sylvain",
      email: "sysylimperatrice@outlook.com",
      password: "123princesse",
    },
  ]);

  function HandleRecipeNote(e) {
    console.info(e.target);
    const avis = e.target.lastElementChild.innerText;
    if (recipeNote === avis) {
      setRecipeNote("");
    } else {
      setRecipeNote(avis);
    }
  }

  const contextValues = useMemo(
    () => ({
      recipes,
      evaluations,
      HandleRecipeNote,
      recipeNote,
      setRecipeNote,
      users,
      setUsers,
    }),
    [recipes, evaluations, HandleRecipeNote, users]
  );
  console.info(recipeNote);

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
