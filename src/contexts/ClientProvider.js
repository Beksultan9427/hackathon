import React from "react";
import { appleApi } from "../helpers/Const";

export const ClientContext = React.createContext();
const reducer = (state, action) => {
  if (action.type === "GET_PHONS") {
    return {
      ...state,
      phones: action.payload,
    };
  }

  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    phones: [],
  });

  const [searchWord, setSearchWord] = React.useState("");

  const [filterByPrice, setFilterByPrice] = React.useState([0, 999999]);
  const [minMax, setMinMax] = React.useState([0, 999999]);
  const limit = 3;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getPhones = () => {
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
          type: "GET_PHONS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const getPricer = () => {
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
    phones: state.phones,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    minMax,
    getPhones,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}
export default ClientProvider;
