import React from "react";
import api from "../../services/api";
import { TextField, Button } from "@mui/material";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DodajSestavino = () => {
  const [naziv, setNaziv] = React.useState("");
  const [enota, setEnota] = React.useState("");
  const [kolicina, setKolicina] = React.useState("");

  const dodajSestavino = () => {
    if (naziv && enota && kolicina) {
      const sestavina = [`${kolicina} ${enota} ${naziv}`];
      fetch(
        "https://api.edamam.com/api/nutrition-details?app_id=aa281a4d&app_key=2a0993b62275abc008d35e9af68cae7e",
        {
          method: "POST",
          body: JSON.stringify({
            ingr: sestavina,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((edmamApiResponse) => edmamApiResponse.json())
        .then((edmamData) => {
          const parsedInfo = edmamData.ingredients[0].parsed[0];

          api
            .post("/sestavina/ustvari-sestavino", {
              quantity: parsedInfo.quantity,
              measure: parsedInfo.measure,
              food: parsedInfo.foodMatch,
              weight: parsedInfo.weight,
              enerc_KCAL: parsedInfo.nutrients.ENERC_KCAL.quantity,
              chocdf: parsedInfo.nutrients.CHOCDF.quantity,
              fat: parsedInfo.nutrients.FAT.quantity,
              procnt: parsedInfo.nutrients.PROCNT.quantity,
            })
            .then(() => {
              setNaziv("");
              setKolicina("");
              setEnota("");
            });
        });
    }
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
          <TextField
            required
            id="outlined-required"
            value={kolicina}
            onChange={(event) => setKolicina(event.target.value)}
            label="Količina"
            sx={{ marginLeft: 1 }}
          />
          <FormControl sx={{ marginLeft: 1, minWidth: 90 }}>
            <InputLabel id="demo-simple-select-label">Enota</InputLabel>
            <Select
              required
              id="outlined-required"
              value={enota}
              label="Enota"
              onChange={(event) => setEnota(event.target.value)}
            >
              <MenuItem value="gram">gram</MenuItem>
              <MenuItem value="liter">liter</MenuItem>
              <MenuItem value="whole">kos</MenuItem>
            </Select>
          </FormControl>
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
