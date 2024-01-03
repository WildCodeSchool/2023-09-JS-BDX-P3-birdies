import { Useinfo } from "../../context/InfoContext";

function Popup() {
  const { popupContent } = Useinfo();
  return <div className="popup-container">{popupContent}</div>;
}

export default Popup;
