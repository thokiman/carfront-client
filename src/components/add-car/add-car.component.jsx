import Modal from "../modal/modal.component";
import React, { useState } from "react";

const AddCar = ({ addCar, fetchCars }) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    price: "",
  });

  const handleSave = () => {
    addCar(car);
    handleClose();
  };
  const handleClickOpen = () => {
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
      placeholder="New Car"
      open={open}
      car={car}
      handleSave={handleSave}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleChange={handleChange}
    />
  );
};

export default AddCar;
