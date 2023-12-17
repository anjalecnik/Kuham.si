import React, {useState, useEffect} from 'react';
import api from '../../services/api';

const Hise = () => {
    // state - hrani stanje, ob spremembi stanja se komponenta v reactu spremeni
    const [hise, setHise] = useState([]);   // začetna vr. je prazen seznam (da ni napak pri prikazovanju na UI)
    useEffect(() => {
        const priodbiHise = () => {
            api.get('/hise').then((response) => {
                setHise(response.data);
                console.log(response);
            });
        };
        priodbiHise();
    }, []);   
    //ulovi da se je komponenta naložila; [] - ko se 1. jalloži, [hise] - ko se hiše updateajo

    return (
        <div style={{margin: '20px', marginTop: '3px'}}>
            <h1>Hise</h1>
            <ol>
                {
                    hise.map((hisa) => (
                        <li key={hisa.id}>
                            {hisa.naslov}{hisa.hisna_stevilka}{hisa.vrst ? 'YES': 'NO'}
                        </li>
                    ))
                }
            </ol>
        </div>
    )
};

export default Hise;