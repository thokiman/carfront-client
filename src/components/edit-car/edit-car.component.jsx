import Modal from "../modal/modal.component";

import React, { useState } from "react";

const EditCar = ({ updateCar, fetchCars, carItem, linkItem }) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    price: "",
  });

  const handleSave = () => {
    updateCar(car, linkItem);
    handleClose();
  };
  const handleClickOpen = () => {
    setCar({
      brand: carItem.brand,
      model: carItem.model,
      color: carItem.color,
      year: carItem.year,
      price: carItem.price,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      placeholder="Update Car"
      open={open}
      car={car}
      handleSave={handleSave}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleChange={handleChange}
    />
  );
};

export default EditCar;
