import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPage() {
  const { sendNewMac } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    const newMac = {
      name: name.trim(),
      year: year.trim(),
      price,
      photo: photo.trim(),
    };
    for (let i in newMac) {
      if (!newMac[i]) {
        alert("Заполните поля!");
        return;
      }
    }
    sendNewMac(newMac);
    setName("");
    setYear("");
    setPrice("");
    setPhoto("");
  };
  return <div>AdminAddPage</div>;
}

export default AdminAddPage;
