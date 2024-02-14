import React, { useState } from "react";
import api from "../../services/api";
import { Button } from "@mui/material";
import "../../assets/css/authentication.css";

const Authentiction = () => {
  //Prijava
  const [uporabniskoImeP, setuporabniskoImeP] = useState("");
  const [gesloP, setGesloP] = useState("");

  //Registracija
  const [ime, setIme] = useState("");
  const [priimek, setPriimek] = useState("");
  const [email, setEmail] = useState("");
  const [uporabniskoImeR, setUporabniskoImeR] = useState("");
  const [gesloR, setGesloR] = useState("");

  const logIn = () => {
    api
      .post("/uporabnik/log-in", {
        uporabniskoIme: uporabniskoImeP,
        geslo: gesloP,
      })
      .then((response) => {
        sessionStorage.setItem("userId", response.data);

        // Preverjanje ali imajo vse sestavine podatke iz Edmam API-ja
        api.get("/sestavina/edmam-api").then((response) => {
          const arraySestavinBrezEdmamPodatkov = response.data.map(
            (item) => `${item.kolicina} ${item.enota} ${item.naziv}`
          );
          if (arraySestavinBrezEdmamPodatkov.length !== 0) {
            fetch(
              "https://api.edamam.com/api/nutrition-details?app_id=aa281a4d&app_key=2a0993b62275abc008d35e9af68cae7e",
              {
                method: "POST",
                body: JSON.stringify({
                  ingr: arraySestavinBrezEdmamPodatkov,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((edmamApiResponse) => edmamApiResponse.json())
              .then((edmamData) => {
                const arraySestavinSPodatki = [];

                edmamData.ingredients.forEach((ingredient) => {
                  const parsedInfo = ingredient.parsed[0];

                  const sestavinaObjekt = {
                    quantity: parsedInfo.quantity,
                    measure: parsedInfo.measure,
                    food: parsedInfo.foodMatch,
                    weight: parsedInfo.weight,
                    enerc_KCAL: parsedInfo.nutrients.ENERC_KCAL.quantity,
                    chocdf: parsedInfo.nutrients.CHOCDF.quantity,
                    fat: parsedInfo.nutrients.FAT.quantity,
                    procnt: parsedInfo.nutrients.PROCNT.quantity,
                  };
                  arraySestavinSPodatki.push(sestavinaObjekt);
                });

                api
                  .post(
                    "/sestavina/shrani-edmam-podatke",
                    arraySestavinSPodatki
                  )
                  .then(() => {
                    window.location.href = "http://localhost:3000/recepti";
                  });
              });
          } else {
            window.location.href = "http://localhost:3000/recepti";
          }
        });
      });
  };

  const register = () => {
    api
      .post("/uporabnik/register", {
        ime: ime,
        priimek: priimek,
        uporabniskoIme: uporabniskoImeR,
        geslo: gesloR,
        email: email,
      })
      .then((response) => {
        sessionStorage.setItem("userId", response.data);
        window.location.href = "http://localhost:3000/recepti";
      });
  };
  
  const logInKuhar = () => {
    api
      .post("/kuhar/log-in", {
        uporabniskoIme: uporabniskoImeP,
        geslo: gesloP,
      })
      .then((response) => {
        sessionStorage.setItem("userId", response.data);

        // Preverjanje ali imajo vse sestavine podatke iz Edmam API-ja
        api.get("/sestavina/edmam-api").then((response) => {
          const arraySestavinBrezEdmamPodatkov = response.data.map(
            (item) => `${item.kolicina} ${item.enota} ${item.naziv}`
          );
          if (arraySestavinBrezEdmamPodatkov.length !== 0) {
            fetch(
              "https://api.edamam.com/api/nutrition-details?app_id=aa281a4d&app_key=2a0993b62275abc008d35e9af68cae7e",
              {
                method: "POST",
                body: JSON.stringify({
                  ingr: arraySestavinBrezEdmamPodatkov,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((edmamApiResponse) => edmamApiResponse.json())
              .then((edmamData) => {
                const arraySestavinSPodatki = [];

                edmamData.ingredients.forEach((ingredient) => {
                  const parsedInfo = ingredient.parsed[0];

                  const sestavinaObjekt = {
                    quantity: parsedInfo.quantity,
                    measure: parsedInfo.measure,
                    food: parsedInfo.foodMatch,
                    weight: parsedInfo.weight,
                    enerc_KCAL: parsedInfo.nutrients.ENERC_KCAL.quantity,
                    chocdf: parsedInfo.nutrients.CHOCDF.quantity,
                    fat: parsedInfo.nutrients.FAT.quantity,
                    procnt: parsedInfo.nutrients.PROCNT.quantity,
                  };
                  arraySestavinSPodatki.push(sestavinaObjekt);
                });

                api
                  .post(
                    "/sestavina/shrani-edmam-podatke",
                    arraySestavinSPodatki
                  )
                  .then(() => {
                    window.location.href = "http://localhost:3000/recepti";
                  });
              });
          } else {
            window.location.href = "http://localhost:3000/recepti";
          }
        });
      });
  };

  const registerKuhar = () => {
    api
      .post("/kuhar/register", {
        ime: ime,
        priimek: priimek,
        uporabniskoIme: uporabniskoImeR,
        geslo: gesloR,
        email: email,
      })
      .then((response) => {
        sessionStorage.setItem("userId", response.data);
        window.location.href = "http://localhost:3000/recepti";
      });
  };

  return (
    <div id="center">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      <form className="form" style={{ marginLeft: "15px"}}>
        <p className="form-title">Prijavi se v svoj račun</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Uporabniško ime"
            value={uporabniskoImeP}
            onChange={(event) => setuporabniskoImeP(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Geslo"
            value={gesloP}
            onChange={(event) => setGesloP(event.target.value)}
          />
        </div>
        <Button variant="contained" color="success" onClick={logIn}>
          Prijava
        </Button>
        <p className="signup-link">Še nimaš računa? Izpolni obrazec na desni</p>
      </form>

      <form className="form" style={{ marginLeft: "15px"}}>
        <p className="form-title">Ustvari nov račun</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Ime"
            value={ime}
            onChange={(event) => setIme(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Priimek"
            value={priimek}
            onChange={(event) => setPriimek(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Uporabniško ime"
            value={uporabniskoImeR}
            onChange={(event) => setUporabniskoImeR(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Geslo"
            value={gesloR}
            onChange={(event) => setGesloR(event.target.value)}
          />
        </div>
        <Button variant="contained" color="success" onClick={register}>
          Registracija
        </Button>
      </form>

      <form className="form" style={{ marginLeft: "15px"}}>
        <p className="form-title">Prijava kuharja</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Uporabniško ime"
            value={uporabniskoImeP}
            onChange={(event) => setuporabniskoImeP(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Geslo"
            value={gesloP}
            onChange={(event) => setGesloP(event.target.value)}
          />
        </div>
        <Button variant="contained" color="success" onClick={logInKuhar}>
          Prijava
        </Button>
      </form>

      <form className="form" style={{ marginLeft: "15px"}}>
        <p className="form-title">Registriraj se kot kuhar</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Ime"
            value={ime}
            onChange={(event) => setIme(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Priimek"
            value={priimek}
            onChange={(event) => setPriimek(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Uporabniško ime"
            value={uporabniskoImeR}
            onChange={(event) => setUporabniskoImeR(event.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Geslo"
            value={gesloR}
            onChange={(event) => setGesloR(event.target.value)}
          />
        </div>
        <Button variant="contained" color="success" onClick={registerKuhar}>
          Registracija
        </Button>
      </form>
      </div>

    </div>
    
  );
};

export default Authentiction;