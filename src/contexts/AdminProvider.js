import React, { createContext, useReducer } from "react";
import { appleApi } from "../helpers/Const";

export const AdminContext = createContext();

const reducer = (state, action) => {
  if (action.type === "GET_MAC") {
    return {
      ...state,
      mac: action.payload,
    };
  }
};

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    mac: [],
    macToEdit: null,
  });

  // ! ADD
  const sendNewMac = (newMac) => {
    fetch(appleApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMac),
    });
  };
  // !

  const getMac = () => {
    fetch(appleApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_MAC",
          payload: data,
        };
        dispatch(action);
      });
  };

  const data = {
    mac: state.mac,
    macToEdit: state.macToEdit,
    sendNewMac,
    getMac,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
