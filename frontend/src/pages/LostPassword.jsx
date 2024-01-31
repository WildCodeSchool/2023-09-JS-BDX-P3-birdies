import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LostPassword() {
  const [everyInfo, setEveryInfo] = useState({});
  const { id } = useParams();

  const fetchData = async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
    );
    setEveryInfo(response.data);
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  function onValuechange(e) {
    setEveryInfo({ ...everyInfo, [e.target.name]: e.target.value });
  }

  const sendChanges = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        everyInfo
      );
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div>
      <div className="user-settings-container">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={everyInfo.email}
          onChange={onValuechange}
        />

        <input
          type="password"
          name="password"
          value={everyInfo.password}
          placeholder="Mot de passe"
          onChange={onValuechange}
        />
        <button
          type="submit"
          className="accept-modifications"
          onClick={sendChanges}
        >
          Modifier
        </button>
      </div>
    </div>
  );
}

export default LostPassword;
