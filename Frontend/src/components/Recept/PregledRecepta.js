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
import { Button } from "@mui/material";


const PregledRecepta = () => {
  const [recept, setRecept] = useState([]);
  const [sestavine, setSestavine] = useState([]);
  const [ocene, setOcene] = useState([]);
  const [sortByRatingAscending, setSortByRatingAscending] = useState(true);

  const [sumENERC_KCAL, setSumENERC_KCAL] = useState(0);
  const [sumFAT, setSumFAT] = useState(0);
  const [sumCHOCDF, setSumCHOCDF] = useState(0);
  const [sumPROCNT, setSumPROCNT] = useState(0);

  const [komentar, setKomentar] = useState('');
  const [novaOcena, setNovaOcena] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedOcenaId, setEditedOcenaId] = useState('');

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

    const pridobiOcene = () => {
      const idRecepta = new URL(window.location.href).pathname.split("/").pop();

      api
        .get(`ocena/pridobi-ocene-za-recept?receptId=${idRecepta}`)
        .then((response) => {
          // Preverjanje, ali je potrebno razvrščanje ocen
          const sortedOcene = [...response.data];
          if (!sortByRatingAscending) {
            sortedOcene.sort((a, b) => b.ocena - a.ocena); // Razvrsti ocene od najvišje do najnižje
          } else {
            sortedOcene.sort((a, b) => a.ocena - b.ocena); // Razvrsti ocene od najnižje do najvišje
          }
          setOcene(sortedOcene);
        });
    };

    pridobiOcene();
    pridobiRecept();
  }, [sortByRatingAscending]);

  const sortByRatingAscendingHandler = () => {
    setSortByRatingAscending(true);
  };

  // Funkcija za obravnavo pritiska na gumb za razvrščanje ocen od najvišje do najnižje
  const sortByRatingDescendingHandler = () => {
    setSortByRatingAscending(false);
  };

  const dodajOceno = () => {
    const idRecepta = new URL(window.location.href).pathname.split("/").pop();
    const ocenaValue = document.getElementById("ocena").value;
    const komentarValue = document.getElementById("komentar").value;


    api
      .post(`/ocena/ustvari-oceno`, {
        idRecepta: idRecepta,
        ocena: ocenaValue,
        komentar: komentarValue,
        idAvtorja: sessionStorage.getItem("userId"),
        datum: new Date().toISOString()
      })
      .then((response) => {
        window.location.reload();
      });
  };

  const brisiOcena = (id) => {

    api
      .delete(`/ocena/ocena/izbrisi-oceno/${id}`)
      .then((response) => {
        console.log("Ocena izbrisana:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Napaka pri brisanju ocene:", error);
      });
  };

  const posodobiOcena = () => {
    if (novaOcena < 1 || novaOcena > 5) {
      console.error("Napaka: Nova ocena mora biti med 1 in 5.");
      return;
    }

    api
      .put(`/ocena/ocena/posodobi-oceno/${editedOcenaId}`, {
        novaOcena: parseInt(novaOcena),
        komentar: komentar,
      })
      .then((response) => {
        console.log("Ocena posodobljena:", response.data);
        window.location.reload();
      }
      )
      .catch((error) => {
        console.error("Napaka pri posodabljanju ocene:", error);
      });
  };





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
                      secondary={`Količina: ${sestavina.kolicina}×${sestavina.sestavina.kolicina
                        } ${sestavina.sestavina.enota === "whole"
                          ? "kos"
                          : sestavina.sestavina.enota
                        }`}
                    />
                  </ListItem>
                ))}
              </List>
            </div><br />

            <div style={{ clear: "both", marginLeft: "10px", marginBottom: "20px" }}>
              {sessionStorage.getItem("userId") && (
                <>
                  <h2>Dodaj komentar</h2>
                  <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
                    <label htmlFor="komentar">Komentar:</label>
                    <textarea id="komentar" name="fname" style={{ marginBottom: "10px" }}></textarea>

                    <label htmlFor="quantity">Ocena med 1 in 5:</label>
                    <input type="number" id="ocena" name="quantity" min="1" max="5" style={{ marginBottom: "10px" }} />

                    <Button variant="contained" color="success" onClick={dodajOceno}>
                      DODAJ
                    </Button>
                  </form>
                </>
              )}
            </div>

            <Button onClick={sortByRatingAscendingHandler} variant="contained" color="primary">
              Razvrsti ocene od najnižje do najvišje
            </Button>

            {/* Gumb za razvrščanje ocen od najvišje do najnižje */}
            <Button onClick={sortByRatingDescendingHandler} variant="contained" color="primary">
              Razvrsti ocene od najvišje do najnižje
            </Button>

            <div style={{ marginLeft: 0, maxWidth: "800px" }}>
              <h3>Pregled ocen</h3>
              <List>
                {ocene && ocene.length > 0 && ocene.map((ocena, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      marginBottom: "10px",
                      background: index % 2 === 0 ? "#f9f9f9" : "#e6e6e6",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p style={{ color: "#B4B4B4" }}>Avtor: {ocena.avtor ? ocena.avtor.uporabniskoIme : ""}</p>
                      <p>Ocena: {ocena.ocena}</p>
                      <p>Komentar: {ocena.komentar}</p>
                      <p>Datum: {ocena.datum}</p>
                    </div>
                    {ocena.avtor && ocena.avtor.id === parseInt(sessionStorage.getItem("userId"), 10) && (

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          style={{
                            background: "#ff4d4d",
                            color: "#fff",
                            padding: "8px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                          onClick={() => brisiOcena(ocena.id)}
                        >
                          Izbriši
                        </button>

                        <button
                          style={{
                            background: "#ffd633",
                            color: "#fff",
                            padding: "8px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setEditMode(true);
                            setEditedOcenaId(ocena.id);
                          }}
                        >
                          Posodobi
                        </button>
                        {editMode && (
                          <div style={{ marginLeft: 0, maxWidth: "800px" }}>
                            <h3>Posodobi oceno</h3>
                            <form>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <label htmlFor="komentar">Komentar:</label>
                                <textarea
                                  id="komentar"
                                  name="komentar"
                                  value={komentar}
                                  onChange={(e) => setKomentar(e.target.value)}
                                  style={{ width: "90%" }}
                                ></textarea>
                              </div>

                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <label htmlFor="novaOcena">Nova ocena (1-5):</label>
                                <input
                                  type="number"
                                  id="novaOcena"
                                  name="novaOcena"
                                  min="1"
                                  max="5"
                                  value={novaOcena}
                                  onChange={(e) => setNovaOcena(e.target.value)}
                                  style={{ width: "90%" }}
                                />
                              </div>

                              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button
                                  type="button"
                                  style={{
                                    background: "blue",
                                    color: "#fff",
                                    padding: "8px 15px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                  }}
                                  onClick={posodobiOcena}
                                >
                                  Potrdi
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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