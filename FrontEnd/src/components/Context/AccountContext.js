import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContextData = createContext();

function ContextData({ children }) {
  const [AddHeight, setAddHeight] = useState();
  const [Refresh, setRefresh] = useState(null);
  const [Person, setPerson] = useState();
  const [ShowSpin2, setShowSpin2] = useState(false);
  const [Noder, setNoder] = useState();
  const [LoginStatus, setLoginStatus] = useState(false);
  const [User, setUser] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/admin/login", {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        setLoginStatus(false);
        return;
      })
      .then((r) => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          setLoginStatus(false);
          return;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          setLoginStatus(data.loggedIn);
          return;
        }

       setUser({ ...data });
       setLoginStatus(data.loggedIn);
        Navigate("/*");
      });
  }, []);

  return (
    <AccountContextData.Provider
      value={{
        AddHeight,
        setAddHeight,
        Refresh,
        setRefresh,
        Person,
        setPerson,
        ShowSpin2,
        setShowSpin2,
        Noder,
        setNoder,
        LoginStatus,
        setLoginStatus,
        User,
        setUser,
      }}
    >
      {children}
    </AccountContextData.Provider>
  );
}

export default ContextData;
