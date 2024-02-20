import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";
import { Button } from "@mui/material";
import List from "@mui/material/List";

const Kuhinje = () => {
  const [kuhinje, setKuhinje] = useState([]);

  const [naziv, setNaziv] = useState('');
  const [lokacija, setLokacija] = useState('');
  const [tipKuhinje, setTipKuhinje] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedKuhinjaId, setEditedKuhinjaId] = useState('');


  useEffect(() => {
    const pridobiKuhinje = () => {

      api.get("/kuhinja").then((response) => {
        setKuhinje(response.data);
      });
    };

    pridobiKuhinje();
  }, []);

  const ustvariKuhinja = () => {
    const naziv = document.getElementById("naziv").value;
    const lokacija = document.getElementById("lokacija").value;
    const tipKuhinje = document.getElementById("tipKuhinje").value;
    const idAvtorja = sessionStorage.getItem("userId");

    api
      .post(`/kuhinja/ustvari-kuhinjo`, {
        naziv: naziv,
        lokacija: lokacija,
        datumNastanka: new Date().toISOString(),
        tipKuhinje: tipKuhinje,
        idAvtorja: idAvtorja
      })
      .then((response) => {
        console.log("Kuhinja ustvarjena:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Napaka pri ustvarjanju kuhinje:", error);
      });
  };

  /*const brisiKuhinjaId = (id) => {
    api
      .delete(`/kuhinja/izbrisi-kuhinjo/${id}`)
      .then((response) => {
        console.log("Kuhinja izbrisana:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Napaka pri brisanju kuhinje:", error);
      });
  }; */

  const brisiKuhinja = (naziv) => {
    api
      .delete(`/kuhinja/izbrisi-kuhinjo/${naziv}`)
      .then((response) => {
        console.log("Kuhinja izbrisana:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Napaka pri brisanju kuhinje:", error);
      });
  };

  /*const posodobiKuhinjoId = () => {
    api
      .put(`/kuhinja/posodobi-kuhinjo/${editedKuhinjaId}`, {
        naziv: naziv,
        lokacija: lokacija,
        tipKuhinje: tipKuhinje,
      })
      .then((response) => {
        console.log("Kuhinja posodobljena:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Napaka pri posodabljanju kuhinje:", error);
      });
  };*/

  const posodobiKuhinjo = () => {
    api
      .put(`/kuhinja/posodobi-kuhinjo/${naziv}`, {
        lokacija: lokacija,
        tipKuhinje: tipKuhinje,
      })
      .then((response) => {
        console.log("Kuhinja posodobljena:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Napaka pri posodabljanju kuhinje:", error);
      });
  };
  


  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div>
          {sessionStorage.getItem("userId") && (
            <>
              <h2>Dodaj kuhinjo</h2>
              <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
                <label htmlFor="naziv">Naziv:</label>
                <input type="text" id="naziv" name="naziv" style={{ marginBottom: "10px" }} />

                <label htmlFor="lokacija">Lokacija:</label>
                <input type="text" id="lokacija" name="lokacija" style={{ marginBottom: "10px" }} />

                <label htmlFor="tipKuhinje">Tip kuhinje:</label>
                <input type="text" id="tipKuhinje" name="tipKuhinje" style={{ marginBottom: "10px" }} />

                <Button variant="contained" color="success" onClick={ustvariKuhinja}>
                  DODAJ
                </Button>
              </form>
            </>
          )}
        </div>


        <div style={{ marginLeft: 0, maxWidth: "800px" }}>
          <h3>Pregled kuhinj</h3>
          <List>
            {kuhinje && kuhinje.length > 0 && kuhinje.map((kuhinja, index) => (
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
                {/* Dodajte console.log(kuhinja) tukaj */}
                {console.log(kuhinja)}

                <div>
                  <p style={{ color: "#B4B4B4" }}>Avtor: {kuhinja.avtor ? kuhinja.avtor.uporabniskoIme : ""}</p>
                  <p>Naziv: {kuhinja.naziv}</p>
                  <p>Lokacija: {kuhinja.lokacija}</p>
                  <p>Datum nastanka: {kuhinja.datumNastanka}</p>
                  <p>Tip kuhinje: {kuhinja.tipKuhinje}</p>
                </div>
                {kuhinja.avtor && kuhinja.avtor.id === parseInt(sessionStorage.getItem("userId"), 10) && (
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
                      onClick={() => brisiKuhinja(kuhinja.naziv)}
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
                        setEditedKuhinjaId(kuhinja.id);
                        setNaziv(kuhinja.naziv);
                        setLokacija(kuhinja.lokacija);
                        setTipKuhinje(kuhinja.tipKuhinje);
                      }}
                    >
                      Posodobi
                    </button>
                    {editMode && editedKuhinjaId === kuhinja.id && (
                      <div style={{ marginLeft: 0, maxWidth: "800px" }}>
                        <h3>Posodobi kuhinjo</h3>
                        <form>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <label htmlFor="naziv">Naziv:</label>
                            <input
                              type="text"
                              id="naziv"
                              name="naziv"
                              value={naziv}
                              onChange={(e) => setNaziv(e.target.value)}
                              style={{ width: "90%" }}
                            />
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <label htmlFor="lokacija">Lokacija:</label>
                            <input
                              type="text"
                              id="lokacija"
                              name="lokacija"
                              value={lokacija}
                              onChange={(e) => setLokacija(e.target.value)}
                              style={{ width: "90%" }}
                            />
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <label htmlFor="tipKuhinje">Tip kuhinje:</label>
                            <input
                              type="text"
                              id="tipKuhinje"
                              name="tipKuhinje"
                              value={tipKuhinje}
                              onChange={(e) => setTipKuhinje(e.target.value)}
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
                              onClick={posodobiKuhinjo}
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
  );

};

export default Kuhinje;