import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Slider,
  Typography,
  Button,
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
  } = useContext(ClientContext);

  useEffect(() => {
    getApple();
  }, [filterByPrice]);
  return (
    <div className="main-page">
      <Container>
        <h2>Весь каталог товаров</h2>

        {/* Фильрация по цене */}
        <div className="filter-block">
          <h4>Фильтрация по цене:</h4>
          <Slider
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
              key={item.id}
              className="products-card"
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
              <Button onClick={() => addAppleToBasket(item)} variant="outlined">
                Добавить в корзину
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
