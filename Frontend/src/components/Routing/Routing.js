import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import PageNotFound from "../PageNotFound/PageNotFound";
import DodajSestavino from "../Sestavine/DodajSestavino";
import Sestavine from "../Sestavine/Sestavine";
import DodajRecept from "../Recept/DodajRecept";
import Authentiction from "../Authentication/Authentication";
import Recepti from "../Recept/Recepti";
import PregledRecepta from "../Recept/PregledRecepta";
import Kuhinje from "../Kuhinja/Kuhinje";

export default function Routing() {
  return (
    <Routes>
      <Route path="authentication" element={<Authentiction />} />

      <Route path="sestavine" element={<Sestavine />} />
      <Route path="sestavine/dodaj" element={<DodajSestavino />} />

      <Route path="" element={<Recepti />} />
      <Route path="recepti" element={<Recepti />} />
      <Route path="recepti/:id" element={<PregledRecepta />} />
      <Route path="recept/dodaj" element={<DodajRecept />} />

      <Route path="kuhinje" element={<Kuhinje />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
