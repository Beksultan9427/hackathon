import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function MainPage() {
  const {
    getApple,
    setFilterByPrice,
    filterByPrice,
    apple,
    addAppleToBasket,
    minMax,
    setCurrentPage,
    currentPage,
    pagesCount,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getApple();
  }, [filterByPrice, currentPage]);
  console.log(filterByPrice);
  return (
    <div className="main-page bac">
      <Container>
        <h2>Весь каталог товаров</h2>
        <div className="filter-block">
          <h4>Фильтрация по цене:</h4>
          <Slider
            sx={{ color: "black" }}
            className="slider"
            min={minMax[0]}
            max={minMax[1]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(_, newValue) => setFilterByPrice(newValue)}
          />
        </div>

        <div className="products">
          {apple.map((item) => (
            <Card
              key={item.id}
              className="products-card"
              sx={{ width: "280px" }}
            >
              <CardMedia
                component="img"
                height={280}
                image={item.photo}
                sx={{ background: "pink" }}
              />
              <CardContent sx={{ background: "pink" }}>
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
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  borderColor: "black",
                  background: "pink",
                  height: "40px",
                  width: "280px",
                }}
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
            variant="outlined"
            shape="rounded"
            sx={{ color: "pink" }}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
