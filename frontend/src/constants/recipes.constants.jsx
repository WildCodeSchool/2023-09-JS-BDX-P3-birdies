const recipes = [
  {
    id: 1,
    name: "Paella",
    picture:
      "https://cdn.pixabay.com/photo/2014/02/13/18/52/wok-265566_1280.jpg",
    prepTime: "125",
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
    prepTime: "120",
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
    prepTime: "50",
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
        description: "Mettre les oignons de coté et faire revenir les lardons",
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

export default recipes;
