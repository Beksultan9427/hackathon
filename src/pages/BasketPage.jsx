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
  const { basketPhones, getPhonesFromBasket } = React.useContext(ClientContext);

  React.useEffect(() => {
    getPhonesFromBasket();
  }, []);

  if (!basketPhones) {
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
            {basketPhones.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img width={60} src={item.photo} alt="" />
                </TableCell>
                <TableCell>{item.price} сом</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.subPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Итогоавя сумма:</TableCell>
              <TableCell colSpan={1}>{basketPhones.totalPrice} сом</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
