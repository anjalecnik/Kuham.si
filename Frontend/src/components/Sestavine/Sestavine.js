import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import DodajSestavino from "./DodajSestavino";

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
    <div>
      <div style={{ margin: "5px" }}>
        <h1>Seznam vseh sestavin v bazi</h1>
        <div>{generate()}</div>
      </div>
      <DodajSestavino />
    </div>
  );
};

export default Sestavine;
