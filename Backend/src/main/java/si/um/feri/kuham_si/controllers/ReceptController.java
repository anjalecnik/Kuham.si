package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Recept;
import si.um.feri.kuham_si.models.Sestavina;
import si.um.feri.kuham_si.models.SeznamSestavin;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.models.dto.ReceptRequest;
import si.um.feri.kuham_si.models.dto.ReceptResponse;
import si.um.feri.kuham_si.repository.ReceptRepository;
import si.um.feri.kuham_si.repository.SestavinaRepository;
import si.um.feri.kuham_si.repository.SeznamSestavinRepository;
import si.um.feri.kuham_si.repository.UporabnikRepository;

import java.util.Map;

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
}
