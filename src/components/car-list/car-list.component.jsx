import {
  SERVER_URL,
  FIND_ALL_CARS,
  ADD_CAR,
} from "../../constants/cars.constant.js";
import "./car-list.styles.css";

import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddCar from "../add-car/add-car.component.jsx";
import EditCar from "../edit-car/edit-car.component.jsx";
import { CSVLink } from "react-csv";
import { Button } from "@material-ui/core";

const CarList = ({ logout }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = () => {
    //read the token from session storage and include it to Authorization header
    //token response from spring security java : Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyOTY4NTYwMX0.stVOh8udhSySOh0irVMNYODDRp4TcUeCecN7A3sUhTghgZTGd2DX4Tf7qby7-F08Ckrm3jCFm-07QgtW1W8zpg
    const token = sessionStorage.getItem("jwt");
    axios
      .get(SERVER_URL + FIND_ALL_CARS, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setCars(response.data._embedded.cars);
      })
      .catch((error) => {
        console.log("Message = " + error);
      });
  };

  const addCar = (car) => {
    const token = sessionStorage.getItem("jwt");

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    axios
      .post(SERVER_URL + ADD_CAR, car, {
        headers: headers,
      })
      .then((response) => {
        fetchCars();
      })
      .catch((error) => {
        console.log("Message = " + error);
      });
  };

  const updateCar = (car, link) => {
    const token = sessionStorage.getItem("jwt");

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    axios
      .put(link, car, {
        headers: headers,
      })
      .then((response) => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        fetchCars();
      })
      .catch((error) => {
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        console.log("Message = " + error);
      });
  };

  const delCar = (link) => {
    const token = sessionStorage.getItem("jwt");
    axios
      .delete(link, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (window.confirm("Are you sure want to delete ?")) {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          fetchCars();
        }
      })
      .catch((error) => {
        toast.error("Error when deleting", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.log("Message = " + error);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const onDelClick = (link) => {
    delCar(link);
  };

  const columns = [
    {
      Header: "Brand",
      accessor: "brand",
    },

    {
      Header: "Model",
      accessor: "model",
    },

    {
      Header: "Color",
      accessor: "color",
    },

    {
      Header: "Year",
      accessor: "year",
    },

    {
      Header: "Price €",
      accessor: "price",
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value, row }) => (
        <EditCar
          carItem={row}
          linkItem={value}
          updateCar={updateCar}
          fetchCars={fetchCars}
        />
      ),
    },
    {
      id: "delbutton",
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value }) => (
        <Button
          id="car-list-modal-button"
          onClick={() => {
            onDelClick(value);
          }}
        >
          Delete Car
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="sub-container"></div>
      <AddCar addCar={addCar} fetchCars={fetchCars} />
      <CSVLink id="csv-link" data={cars} separator={";"}>
        Export CSV
      </CSVLink>
      <div id="logout" onClick={logout}>
        LOGOUT
      </div>
      <ReactTable
        className="table"
        data={cars}
        columns={columns}
        filterable={true}
      />
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default CarList;
