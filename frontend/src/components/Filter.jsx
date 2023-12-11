import blocFiltre from "../styles/icons/Bloc lien filtres.png";

function Filter() {
  return (
    <>
      <div className="container-filter">
        <button type="button">Très facile</button>
        <button type="button">Facile</button>
        <button type="button">Moyen</button>
        <button type="button">Difficile</button>
        <button type="button">-30 minutes</button>
        <button type="button">-1 heure</button>
      </div>
      <div className="container-filter">
        <button type="button">Gourmand</button>
        <button type="button">Santé</button>
        <button type="button">Festif</button>
        <button type="button">Sportif</button>
        <button type="button">De saison</button>
        <button type="button">BBQ</button>
      </div>
      <img className="boxFilter" src={blocFiltre} alt="Icon Filtre" />
    </>
  );
}

export default Filter;
