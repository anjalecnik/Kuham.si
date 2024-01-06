import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";
import Dish from "../../assets/img/food-plate-vector-png-file-hd.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const PregledRecepta = () => {
  const [recept, setRecept] = useState([]);
  const [sestavine, setSestavine] = useState([]);

  useEffect(() => {
    const pridobiRecept = () => {
      const idRecepta = new URL(window.location.href).pathname.split("/").pop();

      api
        .get(`/recept/pridobi-recept?receptId=${idRecepta}`)
        .then((response) => {
          setRecept(response.data.recept);
          setSestavine(response.data.seznamSestavin);
        });
    };

    pridobiRecept();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div>
          <img
            src={Dish}
            style={{ height: "20vw", width: "100%", objectFit: "cover" }}
            alt="Dish"
          />
          <p style={{ color: "#B4B4B4" }}>
            Avtor:
            {recept.avtor ? recept.avtor.uporabniskoIme : ""}
          </p>
          <h1>{recept.naziv ? recept.naziv.toUpperCase() : ""}</h1>
          <div>
            <div className="div-left">
              {recept.opis}
              <hr style={{ border: "1px solid #B4B4B4" }} />
            </div>

            <div className="div-right">
              <h3 style={{ marginBottom: "0px" }}>Seznam sestavin:</h3>
              <List>
                {sestavine.map((sestavina, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <KitchenIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={sestavina.sestavina.naziv}
                      secondary={`Količina: ${sestavina.kolicina}`}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregledRecepta;
