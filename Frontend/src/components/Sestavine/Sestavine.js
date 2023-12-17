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

const Sestavine = () => {
  const [sestavine, setSestavine] = useState([]);

  useEffect(() => {
    const pridobiSestavine = () => {
      api.get("/sestavina").then((response) => {
        setSestavine(response.data);
      });
    };
    pridobiSestavine();
  }, []);

  function generate() {
    return sestavine.map((sestavina, index) => (
      <ListItem key={index}>
        <ListItemIcon>
          <EastIcon />
        </ListItemIcon>
        <ListItemText primary={sestavina.naziv} />
      </ListItem>
    ));
  }

  return (
    <div style={{ margin: "5px" }}>
      <h1>Seznam vseh sestavin v bazi</h1>
      {/* <List>{generate()}</List> */}
      <div>
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
        />
      </div>
    </div>
  );
};

export default Sestavine;
