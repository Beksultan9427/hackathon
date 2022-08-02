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
    getPhones,
    phones,
    filterByPrice,
    setFilterByPrice,
    pagesCount,
    setCurrentPage,
    currentPage,
    minMax,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getPhones();
  }, [filterByPrice, currentPage]);

  return (
    <div className="main-page">
      <Container>
        <h2>Весь каталог Apple</h2>
        <div className="filter-block">
          <h4>Фильтрация по цене</h4>
          <Slider
            max={minMax[1]}
            min={minMax[0]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(e, newValue) => setFilterByPrice(newValue)}
          />
        </div>
        <div className="products">
          {phones.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia component="img" height={140} image={item.photo} />
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
                    <span>Бренд:</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Дата выпуска:</span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Страна производства:</span>
                    <span>{item.country}</span>
                  </li>
                  <li>
                    <span>Цена:</span>
                    <span>{item.price} сом</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
