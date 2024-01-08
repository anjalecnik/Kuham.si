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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PregledRecepta = () => {
  const [recept, setRecept] = useState([]);
  const [sestavine, setSestavine] = useState([]);

  const [sumENERC_KCAL, setSumENERC_KCAL] = useState(0);
  const [sumFAT, setSumFAT] = useState(0);
  const [sumCHOCDF, setSumCHOCDF] = useState(0);
  const [sumPROCNT, setSumPROCNT] = useState(0);

  useEffect(() => {
    const pridobiRecept = () => {
      const idRecepta = new URL(window.location.href).pathname.split("/").pop();

      api
        .get(`/recept/pridobi-recept?receptId=${idRecepta}`)
        .then((response) => {
          setRecept(response.data.recept);
          setSestavine(response.data.seznamSestavin);

          // Izračun skupne hranilne vrednosti
          setSumENERC_KCAL(0);
          setSumFAT(0);
          setSumCHOCDF(0);
          setSumPROCNT(0);

          response.data.seznamSestavin.forEach((sestavina) => {
            const ekstrahiraneVrednosti = {};
            sestavina.sestavina.edmamPodatki.split(", ").forEach((keyValue) => {
              const [key, value] = keyValue.split("=");
              ekstrahiraneVrednosti[key] = parseFloat(value);
            });
            console.log(ekstrahiraneVrednosti);

            setSumENERC_KCAL(
              (prevSum) => prevSum + ekstrahiraneVrednosti.ENERC_KCAL_quantity
            );
            setSumFAT(
              (prevSum) => prevSum + ekstrahiraneVrednosti.FAT_quantity
            );
            setSumCHOCDF(
              (prevSum) => prevSum + ekstrahiraneVrednosti.CHOCDF_quantity
            );
            setSumPROCNT(
              (prevSum) => prevSum + ekstrahiraneVrednosti.PROCNT_quantity
            );
          });
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

              {sessionStorage.getItem("userId") ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">
                          Energijska vrednost&nbsp;(kcal)
                        </TableCell>
                        <TableCell align="right">Maščobe&nbsp;(g)</TableCell>
                        <TableCell align="right">
                          Ogljikovi hidrati&nbsp;(g)
                        </TableCell>
                        <TableCell align="right">
                          Beljakovine&nbsp;(g)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={recept.naziv ? recept.naziv : ""}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {recept.naziv ? recept.naziv : ""}
                        </TableCell>
                        <TableCell align="right">{sumENERC_KCAL}</TableCell>
                        <TableCell align="right">{sumFAT}</TableCell>
                        <TableCell align="right">{sumCHOCDF}</TableCell>
                        <TableCell align="right">{sumPROCNT}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>
                  <i>Za ogled hranilne vrednosti se prijavite!</i>
                </p>
              )}
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
                      secondary={`Količina: ${sestavina.kolicina}×${
                        sestavina.sestavina.kolicina
                      } ${
                        sestavina.sestavina.enota === "whole"
                          ? "kos"
                          : sestavina.sestavina.enota
                      }`}
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
