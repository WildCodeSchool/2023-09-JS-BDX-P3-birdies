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

  return (
    <div className={listVisible ? "show-user-list" : "hide-user-list"}>
      {dbUsers.map((e) => (
        <div>
          <div>Prénom:{e.firstname}</div>
          <div> Nom:{e.lastname} </div>
          <div>Email:{e.email}</div>
          <div className="user-info-separation">
            Pseudo:
            {e.pseudo}
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
