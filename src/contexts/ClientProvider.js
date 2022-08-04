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
  if (action.type === "GET_PHONS_FROM_BASKET") {
    return {
      ...state,
      basketPhones: action.payload,
    };
  }
  if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
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

  const addPhonesToBasket = (phones) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let phonesToBasket = {
      ...phones,
      count: 1,
      subPrice: phones.price,
    };

    let chek = basket.products.find((item) => {
      return item.id === phonesToBasket.id;
    });
    if (chek) {
      basket.products = basket.products.map((item) => {
        if (item.id === phonesToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(phonesToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getPhonesFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_PHONES_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
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

  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        products: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.products.length,
    };
    dispatch(action);
  };
  React.useEffect(() => {
    getPricer();
    getBasketCount();
  }, []);

  const data = {
    phones: state.phones,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketPhones: state.basketPhones,
    minMax,
    basketCount: state.basketCount,
    getPhones,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addPhonesToBasket,
    getPhonesFromBasket,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}
export default ClientProvider;
