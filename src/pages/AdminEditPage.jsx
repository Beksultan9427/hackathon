import { Container, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

function AdminEditPage() {
  const { getAppleToEdit, appleToEdit, saveEditApple } =
    useContext(AdminContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    const editApple = {
      name,
      year,
      price,
      photo,
      id,
    };
    for (let i in editApple[i]) {
      if (typeof editApple[i] === "string") {
        if (!editApple[i].trim) {
          alert("Заполните поля");
          return;
        }
      }
    }
    saveEditApple(editApple);
    navigate("/admin");
  };

  useEffect(() => {
    getAppleToEdit(id);
  }, []);

  useEffect(() => {
    if (appleToEdit) {
      setName(appleToEdit.name);
      setYear(appleToEdit.year);
      setPrice(appleToEdit.price);
      setPhoto(appleToEdit.photo);
    }
  }, [appleToEdit]);
  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Редактировать</h2>
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
            onChange={(e) => setPrice(e.target.value)}
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
            Изменить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminEditPage;
