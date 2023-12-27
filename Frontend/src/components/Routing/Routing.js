import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import PageNotFound from "../PageNotFound/PageNotFound";
import DodajSestavino from "../Sestavine/DodajSestavino";
import Sestavine from "../Sestavine/Sestavine";
import DodajRecept from "../Recept/DodajRecept";
import Authentiction from "../Authentication/Authentication";

export default function Routing() {
  return (
    <Routes>
      <Route path="authentication" element={<Authentiction />} />
      <Route path="sestavine" element={<Sestavine />} />
      <Route path="sestavine/dodaj" element={<DodajSestavino />} />

      <Route path="recept/dodaj" element={<DodajRecept />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
