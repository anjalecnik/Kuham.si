import React, { useEffect, useState } from "react";
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
        window.location.href = "http://localhost:3000/recepti";
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

  return (
    <div id="center">
      <form className="form">
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

      <form className="form" style={{ marginLeft: "15px" }}>
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
    </div>
  );
};

export default Authentiction;
