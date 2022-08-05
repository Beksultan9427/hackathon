import React, { useContext, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";
import { HighlightOff } from "@mui/icons-material";

function BasketPage() {
  const { basketApple, getAppleFromBasket, deleteApple } =
    useContext(ClientContext);

  useEffect(() => {
    getAppleFromBasket();
  }, []);

  if (!basketApple) {
    return (
      <div className="basket-page">
        <Container>
          <h2>Корзина пуста</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>Корзина</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название:</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Цена:</TableCell>
              <TableCell>Кол-во:</TableCell>
              <TableCell>Сумма:</TableCell>
              <TableCell>Удалить</TableCell>
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
                <TableCell>{item.subPrice} $</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Итоговая сумма:</TableCell>
              <TableCell colSpan={1}>{basketApple.totalPrice} $</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
