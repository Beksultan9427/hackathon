import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { appleApi } from "../helpers/Const";

export const ClientContext = createContext();

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
  if (action.payload === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    apple: [],
    basketApple: {
      products: [],
      totalPrice: 0,
    },
    basketCount: 0,
  });

  const [searchWord, setSearchWord] = useState("");

  const [filterByPrice, setFilterByPrice] = useState([0, 5000]);
  const [minMax, setMinMax] = useState([0, 5000]);
  const limit = 3;
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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

  const addAppleToBasket = (apple) => {
    // ! localStorage.setItem() - добавление
    // ! localStorage.getItem() -
    // ! localStorage.removeItem() -
    // ! localStorage.clear() - очитска всего
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let appleToBasket = {
      ...apple,
      count: 1,
      subPrice: apple.price,
    };
    // console.log(apple, appleToBasket);
    let check = basket.products.find((item) => {
      return item.id === appleToBasket.id;
    });
    // console.log(check, "check");
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === appleToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(appleToBasket);
    }

    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    // console.log(basket.products, "here");
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

  // ! fix price
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

  // ! fix отображения кол-во товара в navbar
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
  // !

  useEffect(() => {
    getPrice();
    getBasketCount();
  }, []);

  const data = {
    apple: state.apple,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketApple: state.basketApple,
    basketCount: state.basketCount,
    minMax,

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
