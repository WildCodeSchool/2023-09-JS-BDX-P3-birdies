import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function AllUsers({ listVisible }) {
  const [dbUsers, setDbUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/users")
      .then((res) => setDbUsers(res?.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3310/api/users/${id}`);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
    return alert("Utilisateur supprimé"); // eslint-disable-line no-alert
  };

  return (
    <div className={listVisible ? "show-user-list" : "hide-user-list"}>
      {dbUsers.map((e) => (
        <div>
          <div>Prénom:{e.firstname}</div>
          <div> Nom:{e.lastname} </div>
          <div>Email:{e.email}</div>
          <div>
            Pseudo:
            {e.pseudo}
          </div>
          <div className="user-info-separation">
            <button
              className="delete-user-button"
              type="button"
              onClick={() => handleDelete(e.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

AllUsers.propTypes = {
  listVisible: PropTypes.bool.isRequired,
};

export default AllUsers;
