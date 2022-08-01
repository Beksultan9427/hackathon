import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function MacPage() {
  return (
    <div className="">
      <Container>
        <h2>MacBook</h2>
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
