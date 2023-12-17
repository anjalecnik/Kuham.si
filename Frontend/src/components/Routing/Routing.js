import React from "react";
import {Routes} from 'react-router-dom';
import {Route} from 'react-router';
import Hise from "../Hise/Hise";
import PageNotFound from "../PageNotFound/PageNotFound";
import DodajHiso from "../Hise/DodajHiso";

export default function Routing() {
    return(
        <Routes>
            <Route path='/' element= {<Hise/>}/>
            <Route path='hise' element= {<Hise/>}/>
            <Route path='hise/dodaj-hise' element= {<DodajHiso/>}/>
            <Route path='*' element= {<PageNotFound/>}/>
        </Routes>
    )
}