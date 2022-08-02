import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { appleApi } from "../helpers/Const";

function MacPage() {
  return (
    <div className="mac-add-page">
      <Container>
        <h2>Добавить товары Mac</h2>
        <form></form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Год</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Фото</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Container>
    </div>
  );
}

export default MacPage;
