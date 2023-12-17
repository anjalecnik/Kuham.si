import React from "react";
import api from "../../services/api";
import { TextField, Button } from "@mui/material";

const DodajSestavino = () => {
  const [naziv, setNaziv] = React.useState("");

  const dodajSestavino = () => {
    api
      .post("/sestavina/ustvari-sestavino", {
        naziv: naziv,
      })
      .then((response) => {
        setNaziv("");
        console.log(response.data);
      });
  };

  return (
    <div style={{ margin: "5px" }}>
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
  );
};

export default DodajSestavino;
