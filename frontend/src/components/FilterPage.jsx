import imgflower from "../styles/img/flower.png";

function FilterPage() {
  return (
    <div className="container-filter-page">
      <img className="flowerFiltre" src={imgflower} alt="" />
      <div className="particularity-container">
        <h1>Particularités</h1>
        <p>Végétarien</p>
        <p>Sans lactose</p>
        <p>Végan</p>
        <p>Sans gluten</p>
      </div>
      <div className="repas-container">
        <h1>Repas</h1>
        <p>Entrée</p>
        <p>Snack</p>
        <p>Plat</p>
        <p>Dessert</p>
        <p>Boissons</p>
      </div>
      <div className="style-container">
        <h1>Style</h1>
        <p>Français</p>
        <p>Asiatique</p>
        <p>Méditerranéen</p>
        <p>Oriental</p>
        <p>Caribéen</p>
        <p>Hispanique</p>
        <p>USA</p>
        <p>Québecois</p>
      </div>
    </div>
  );
}

export default FilterPage;
