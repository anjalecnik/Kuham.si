import React from "react";
import api from "../../services/api";
import { TextField, Button } from "@mui/material";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";

const DodajSestavino = () => {
  const [naziv, setNaziv] = React.useState("");

  const dodajSestavino = () => {
    api
      .post("/sestavina/ustvari-sestavino", {
        naziv: naziv,
      })
      .then((response) => {
        setNaziv("");
      });
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h1>Dodaj novo sestavino</h1>
        <div>
          <TextField
            required
            id="outlined-required"
            value={naziv}
            onChange={(event) => setNaziv(event.target.value)}
            label="Naziv"
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <Button variant="contained" color="success" onClick={dodajSestavino}>
            DODAJ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DodajSestavino;
