import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  return <AdminContext.Provider>{children}</AdminContext.Provider>;
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UseAdmin = () => useContext(AdminContext);
