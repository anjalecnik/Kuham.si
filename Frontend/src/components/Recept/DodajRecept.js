import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Autocomplete,
  TextField,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";

const DodajRecept = () => {
  const [sestavine, setSestavine] = useState([]);

  useEffect(() => {
    const pridobiSestavine = () => {
      api.get("/sestavina").then((response) => {
        setSestavine(response.data);
      });
    };
    pridobiSestavine();
  }, []);

  return (
    <div style={{ margin: "5px" }}>
      <h1>Dodaj nov recept</h1>
      <div>
        <TextField
          id="naziv"
          label="Naziv"
          helperText="Kako najbolje opišeš svoj recept...?"
        />
        <Autocomplete
          multiple
          id="seznam-sestavin"
          options={sestavine}
          getOptionLabel={(option) => option.naziv}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Dodaj sestavine"
              placeholder="Sestavine"
            />
          )}
          style={{ marginTop: "15px" }}
        />
      </div>
    </div>
  );
};

export default DodajRecept;
