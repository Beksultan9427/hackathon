import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPage() {
  const { sendNewApple } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    const newApple = {
      name: name.trim(),
      year: year.trim(),
      price,
      photo: photo.trim(),
    };
    for (let i in newApple) {
      if (!newApple[i]) {
        alert("Заполните поля!");
        return;
      }
    }
    sendNewApple(newApple);
    setName("");
    setYear("");
    setPrice("");
    setPhoto("");
  };

  return (
    <div className="admin-add-page">
      <Container>
        <h2>Добавить товары</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Название"
            variant="standard"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Год"
            variant="standard"
            type="date"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Цена"
            variant="standard"
            type="number"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Добавить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;
