import { Useinfo } from "../../context/InfoContext";

export default function Popup() {
  const { popupContent } = Useinfo();
  return (
    <div className="popup-container">
      <div className="popup-content">{popupContent}</div>
    </div>
  );
}
