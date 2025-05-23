import { createContext, useState, useEffect } from "react";
import { ORIGIN_URL } from "../config";
import axios from "axios";

export const UsersContext = createContext();

function UsersContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${ORIGIN_URL}/users`, {
          withCredentials: true,
        });
        setUsers(res.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  },[]);

  return (
    <div>
      <UsersContext.Provider
        value={{ users, setUsers, loading, setLoading, error, setError }}
      >
        {children}
      </UsersContext.Provider>
    </div>
  );
}

export default UsersContextProvider;
