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
  if (action.type === "GET_APPLE_FROM_BASKET") {
    return {
      ...state,
      basketApple: action.payload,
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

  const addAppleToBasket = (Apple) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let AppleToBasket = {
      ...Apple,
      count: 1,
      subPrice: Apple.price,
    };

    let chek = basket.products.find((item) => {
      return item.id === AppleToBasket.id;
    });
    if (chek) {
      basket.products = basket.products.map((item) => {
        if (item.id === AppleToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(AppleToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getAppleFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_APPLE_FROM_BASKET",
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
    apple: state.apple,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketApple: state.basketApple,
    minMax,
    basketCount: state.basketCount,
    getApple,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addAppleToBasket,
    getAppleFromBasket,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}
export default ClientProvider;
