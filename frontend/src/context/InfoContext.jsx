import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const InfoContext = createContext();

export function InfoContextProvider({ children }) {
  return <InfoContext.Provider>{children}</InfoContext.Provider>;
}

InfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Useinfo = () => useContext(InfoContext);
