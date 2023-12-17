import React from "react";
import api from "../../services/api";
import {Checkbox, TextField, Button } from '@mui/material'

const DodajHiso = () => {
    const [naslov, setNaslov] = React.useState('');
    const [hisna_stevilka, setHisnaStevilka] = React.useState(0);
    const [velikost, setVelikost] = React.useState(0);
    const [vrt, setVrt] = React.useState(false);

    const dodajHiso= () => {
        api.post('/hise', {
            hisna_stevilka: hisna_stevilka,
            naslov: naslov,
            velikost: velikost,
            vrt: vrt
        }).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <div>
            <h1>Dodaj hiso</h1>
            <TextField id="outlined-basic" value = {naslov} onChange={(event) => setNaslov(event.target.value)} label="Naslov" variant="outlined" />
            <TextField id="outlined-basic" value = {hisna_stevilka} onChange={(event) => setHisnaStevilka(event.target.value)} label="Hišna številka" variant="outlined" />
            <TextField id="outlined-basic" value = {velikost} onChange={(event) => setVelikost(event.target.value)} label="Velikost" variant="outlined" />
            <Checkbox id="outlined-basic" checked={vrt} onChange={(event) => setVrt(event.target.value)} label="Vrt" variant="outlined" />
            <Button variant ="contained" onClick="dodajHiso()">Dodaj hišo</Button>
        </div>
    )
}

export default DodajHiso;