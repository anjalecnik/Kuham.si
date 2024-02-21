package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.*;
import si.um.feri.kuham_si.models.dto.ReceptRequest;
import si.um.feri.kuham_si.models.dto.ReceptResponse;
import si.um.feri.kuham_si.repository.*;

import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/recept")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceptController {
    @Autowired
    private ReceptRepository receptDao;

    @Autowired
    private UporabnikRepository uporabnikDao;

    @Autowired
    private SeznamSestavinRepository seznamSestavinDao;

    @Autowired
    private SestavinaRepository sestavinaDao;

    @Autowired
    private OcenaRepository ocenaDao;

    @GetMapping
    public Iterable<Recept> vrniRecepte() {
        Iterable<Recept> recepti = receptDao.findAll();
        return recepti;
    }

    @PostMapping("/ustvari-recept")
    public Map dodajRecept(@RequestBody ReceptRequest receptRequest) {
        Long avtorId = receptRequest.getIdAvtorja();
        Uporabnik uporabnik = uporabnikDao.findById(avtorId)
                .orElseThrow(() -> new EntityNotFoundException("Uporabnik z id " + avtorId + " ne obstaja"));

        Recept recept = new Recept();
        recept.setNaziv(receptRequest.getNaziv());
        recept.setOpis(receptRequest.getOpis());
        recept.setAvtor(uporabnik);

        receptDao.save(recept);

        for (Map.Entry<Long, Integer> sestavinaKolicina : receptRequest.getSestavineSKolicinami().entrySet()) {
            Long sestavinaId = sestavinaKolicina.getKey();
            Integer kolicina = sestavinaKolicina.getValue();

            SeznamSestavin seznamSestavin = new SeznamSestavin();
            seznamSestavin.setKolicina(kolicina);
            seznamSestavin.setRecept(recept);

            Sestavina sestavina = sestavinaDao.findById(sestavinaId)
                    .orElseThrow(() -> new EntityNotFoundException("Sestavina z id " + sestavinaId + " ne obstaja"));

            seznamSestavin.setSestavina(sestavina);

            seznamSestavinDao.save(seznamSestavin);
        }

        return receptRequest.getSestavineSKolicinami();
    }

    @GetMapping("/pridobi-recept")
    public ReceptResponse vrniRecept(@RequestParam Long receptId) {
        Recept recept = receptDao.findById(receptId)
                .orElseThrow(() -> new EntityNotFoundException("Recept z id " + receptId + " ne obstaja"));

        Iterable<SeznamSestavin> seznamSestavin = seznamSestavinDao.findAllByRecept_Id(receptId);

        ReceptResponse response = new ReceptResponse();
        response.setRecept(recept);
        response.setSeznamSestavin(seznamSestavin);

        return response;
    }

    @GetMapping("/po-oceni")
    public Iterable<Recept> vrniReceptePoOceni() {
        Iterable<Recept> vsiRecepti = receptDao.findAll();

        // Sortiranje receptov po povprečni oceni od najvišje do najnižje
        List<Recept> urejeniRecepti = StreamSupport.stream(vsiRecepti.spliterator(), false)
                .sorted((r1, r2) ->
                        Double.compare(povprecnaOcenaRecepta(r2), povprecnaOcenaRecepta(r1)))
                .collect(Collectors.toList());

        return urejeniRecepti;
    }

    private double povprecnaOcenaRecepta(Recept recept) {
        // Pridobitev vseh ocen za določen recept
        List<Ocena> oceneRecepta = ocenaDao.findByReceptId(recept.getId());

        // Če recept nima ocen, vrnemo povprečje 0
        if (oceneRecepta.isEmpty()) {
            return 0.0;
        }

        // Izračun povprečne ocene
        double povprecnaOcena = oceneRecepta.stream()
                .mapToInt(Ocena::getOcena)
                .average()
                .orElse(0.0);

        return povprecnaOcena;
    }
}
