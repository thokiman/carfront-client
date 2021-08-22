import "./modal.styles.css";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const Modal = ({
  placeholder,
  open,
  car,
  handleChange,
  handleClickOpen,
  handleClose,
  handleSave,
}) => {
  return (
    <div>
      <Button
        id={"modal-button" + (placeholder === "New Car" ? "-add" : "-update")}
        onClick={handleClickOpen}
      >
        {placeholder}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{placeholder}</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            autoFocus
            fullWidth
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <br />
          <TextField
            fullWidth
            label="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <br />
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <br />
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={car.year}
            onChange={handleChange}
          />
          <br />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
