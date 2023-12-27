import { Useinfo } from "../../context/InfoContext";

function Popup() {
  const { popup } = Useinfo();
  return <div className="popup-container">{popup}</div>;
}

export default Popup;
