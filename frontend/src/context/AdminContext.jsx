import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Useinfo } from "./InfoContext";

const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const { user } = Useinfo();

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <AdminContext.Provider>{children}</AdminContext.Provider>;
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UseAdmin = () => useContext(AdminContext);
