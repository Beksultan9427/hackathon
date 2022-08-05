import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Slider,
  Typography,
  Button,
  Pagination,
} from "@mui/material";

import React, { useContext, useEffect } from "react";
import { ClientContext } from "../contexts/ClientProvider";
function MainPage() {
  const {
    minMax,
    setFilterByPrice,
    filterByPrice,
    getApple,
    apple,
    addAppleToBasket,
    pagesCount,
    setCurrentPage,
    currentPage,
  } = useContext(ClientContext);

  useEffect(() => {
    getApple();
  }, [filterByPrice, currentPage]);
  return (
    <div className="main-page">
      <Container>
        <h2>Весь каталог товаров</h2>

        {/* Фильтрация по цене */}
        <div className="filter-block">
          <h4>Фильтрация по цене:</h4>
          <Slider
            sx={{ color: "gray" }}
            min={minMax[0]}
            max={minMax[1]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(_, newValue) => setFilterByPrice(newValue)}
          />
          {/*  */}
        </div>
        <div className="products">
          {apple.map((item) => (
            <Card
              key={item.id + "apple"}
              className="product-card"
              sx={{ width: "280px" }}
            >
              <CardMedia component="img" height={280} image={item.photo} />
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="product-card-ul">
                  <li>
                    <span>Название:</span>
                    <span>{item.name}</span>
                  </li>
                  <li>
                    <span>Дата выпуска:</span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Цена:</span>
                    <span>{item.price} $</span>
                  </li>
                </ul>
              </CardContent>
              <Button
                onClick={() => addAppleToBasket(item)}
                variant="outlined"
                shape="rounded"
              >
                Добавить в корзину
              </Button>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
            shape="rounded"
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
