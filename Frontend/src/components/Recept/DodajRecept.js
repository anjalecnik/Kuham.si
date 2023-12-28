import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Autocomplete, TextField, InputAdornment, Button } from "@mui/material";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";

const DodajRecept = () => {
  const [sestavineIzBaze, setSestavineIzBaze] = useState([]);
  const [poljaSKolicinami, setPoljaSKolicinami] = useState([]);

  const [naziv, setNaziv] = React.useState("");
  const [opis, setOpis] = useState("");
  const [poljaSSestavinami, setPoljaSSestavinami] = useState([]);

  useEffect(() => {
    const pridobiSestavine = () => {
      api.get("/sestavina").then((response) => {
        setSestavineIzBaze(response.data);
      });
    };
    pridobiSestavine();
  }, []);

  const spremembaSestavin = (_event, value) => {
    setPoljaSSestavinami(value);
    const fields = value.map((sestavina) => (
      <div>
        <TextField
          id={`kolicina-${sestavina.naziv}`}
          label={`Količina za ${sestavina.naziv.toLowerCase()}`}
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{sestavina.enota}</InputAdornment>
            ),
          }}
          style={{ marginTop: "15px" }}
        />
        <br />
      </div>
    ));
    setPoljaSKolicinami(fields);
  };

  const dodajRecept = () => {
    const sestavineSKolicinami = {};
    for (const izbranaSestavina of poljaSSestavinami) {
      const kolicinaValue = document.getElementById(
        `kolicina-${izbranaSestavina.naziv}`
      ).valueAsNumber;
      sestavineSKolicinami[izbranaSestavina.id] = kolicinaValue;
    }

    api.post("/recept/ustvari-recept", {
      naziv: naziv,
      opis: opis,
      sestavineSKolicinami: sestavineSKolicinami,
      idAvtorja: sessionStorage.getItem("userId"),
    });
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h1>Dodaj nov recept</h1>
        <div>
          <TextField
            id="naziv"
            label="Naziv"
            helperText="Kako najbolje na kratko opišeš svoj recept...?"
            onChange={(event) => setNaziv(event.target.value)}
          />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Opis"
            multiline
            maxRows={4}
            fullWidth
            helperText="Razloži kako jed pripraviš"
            onChange={(event) => setOpis(event.target.value)}
          />
          <Autocomplete
            multiple
            id="seznam-sestavin"
            options={sestavineIzBaze}
            getOptionLabel={(option) => option.naziv}
            filterSelectedOptions
            onChange={spremembaSestavin}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Izberi sestavine"
                placeholder="Sestavine"
              />
            )}
            style={{ marginTop: "15px" }}
          />
          {poljaSKolicinami}
        </div>
        <div style={{ marginTop: "5px" }}>
          <Button variant="contained" color="success" onClick={dodajRecept}>
            DODAJ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DodajRecept;
