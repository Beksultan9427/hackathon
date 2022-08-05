import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function BasketPage() {
  const { basketApple, getAppleFromBasket } = React.useContext(ClientContext);

  React.useEffect(() => {
    getAppleFromBasket();
  }, []);

  if (!basketApple) {
    return (
      <div className="basket-page">
        <Container>
          <h2>Корзина пока пуста</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>КОРЗИНА</h2>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Названия:</TableCell>
              <TableCell>Фото:</TableCell>
              <TableCell>Цена:</TableCell>
              <TableCell>Кол-во:</TableCell>
              <TableCell>Сумма:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketApple.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img width={60} src={item.photo} alt="" />
                </TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.subPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Итогоавя сумма:</TableCell>
              <TableCell colSpan={1}>{basketApple.totalPrice} $</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
