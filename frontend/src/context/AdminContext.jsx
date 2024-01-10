import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Useinfo } from "./InfoContext";

const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const { user } = Useinfo();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (user.id !== "admin") {
      return <Navigate to="/" />;
    }
    return null;
  });

  const adminData = useMemo(
    () => ({
      isAdmin,
      setIsAdmin,
    }),
    [isAdmin, setIsAdmin]
  );
  return (
    <AdminContext.Provider value={adminData}>{children}</AdminContext.Provider>
  );
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UseAdmin = () => useContext(AdminContext);
