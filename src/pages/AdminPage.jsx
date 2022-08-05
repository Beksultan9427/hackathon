import { Edit, HighlightOff } from "@mui/icons-material";
import {
  Container,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

function AdminPage() {
  const { apple, getApple, deleteApple } = useContext(AdminContext);

  useEffect(() => {
    getApple();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Админ панель</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Год</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Редакт.</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apple.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <img width={100} src={item.photo} alt="" />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <Edit />
                  </Link>
                </TableCell>
                <TableCell>
                  <HighlightOff onClick={() => deleteApple(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
