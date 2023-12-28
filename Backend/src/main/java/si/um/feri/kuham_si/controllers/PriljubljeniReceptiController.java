package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.PriljubljeniRecepti;
import si.um.feri.kuham_si.models.Recept;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.models.dto.PriljubljeniReceptiRequest;
import si.um.feri.kuham_si.repository.PriljubljeniReceptiRepository;
import si.um.feri.kuham_si.repository.ReceptRepository;
import si.um.feri.kuham_si.repository.UporabnikRepository;

@RestController
@RequestMapping("/priljubljeni-recepti")
@CrossOrigin(origins = "http://localhost:3000")
public class PriljubljeniReceptiController {
    @Autowired
    private PriljubljeniReceptiRepository priljubljeniReceptiDao;

    @Autowired
    private UporabnikRepository uporabnikDao;

    @Autowired
    private ReceptRepository receptDao;

    @PostMapping("/dodaj-med-priljubljene")
    public void dodajMedPriljubljene(@RequestBody PriljubljeniReceptiRequest priljubljeniReceptiRequest) {
        Long uporabnikId = priljubljeniReceptiRequest.getIdUporabnika();
        Uporabnik uporabnik = uporabnikDao.findById(uporabnikId)
                .orElseThrow(() -> new EntityNotFoundException("Uporabnik z id " + uporabnikId + " ne obstaja"));

        Long receptId = priljubljeniReceptiRequest.getIdRecepta();
        Recept recept = receptDao.findById(receptId).orElseThrow(() -> new EntityNotFoundException("Recept z id " + receptId + " ne obstaja"));

        PriljubljeniRecepti priljubljenRecept = new PriljubljeniRecepti();
        priljubljenRecept.setUporabnik(uporabnik);
        priljubljenRecept.setRecept(recept);

        priljubljeniReceptiDao.save(priljubljenRecept);
    }

    @GetMapping
    public Iterable<PriljubljeniRecepti> vrniPriljubljeneRecepte(@RequestParam Long uporabnikId) {
        Iterable<PriljubljeniRecepti> priljubljeniRecepti = priljubljeniReceptiDao.findByUporabnik_Id(uporabnikId);
        return priljubljeniRecepti;
    }

}
