import React from "react";
import { appleApi } from "../helpers/Const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_APPLE") {
    return {
      ...state,
      apple: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    apple: [],
  });

  const [searchWord, setSearchWord] = React.useState("");

  const [filterByPrice, setFilterByPrice] = React.useState([0, 5000]);
  const [minMax, setMinMax] = React.useState([0, 5000]);
  const limit = 3;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getApple = () => {
    fetch(
      `${appleApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}
      &_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_APPLE",
          payload: data,
        };
        dispatch(action);
      });
  };

  const getPrice = () => {
    fetch(appleApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  const data = {
    apple: state.apple,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    minMax,

    getApple,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}
export default ClientProvider;
