import React, { createContext, useReducer } from "react";
import { appleApi } from "../helpers/Const";

export const AdminContext = createContext();

const reducer = (state, action) => {
  if (action.type === "GET_APPLE") {
    return {
      ...state,
      apple: action.payload,
    };
  }
  if (action.type === "GET_APPLE_TO_EDIT") {
    return {
      ...state,
      apple: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    apple: [],
    appleToEdit: null,
  });

  // ! ADD
  const sendNewApple = (newApple) => {
    fetch(appleApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApple),
    });
  };
  // !

  const getApple = () => {
    fetch(appleApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_APPLE",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! delete
  const deleteApple = (id) => {
    fetch(`${appleApi}/${id}`, {
      method: "DELETE",
    }).then(() => getApple());
  };
  // !

  // ! update edit
  const getAppleToEdit = (id) => {
    fetch(`${appleApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_APPLE_TO_EDIT",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! update save

  const saveEditApple = (editApple) => {
    fetch(`${appleApi}/${editApple.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editApple),
    });
  };
  const data = {
    apple: state.apple,
    appleToEdit: state.appleToEdit,
    sendNewApple,
    getApple,
    deleteApple,
    getAppleToEdit,
    saveEditApple,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
