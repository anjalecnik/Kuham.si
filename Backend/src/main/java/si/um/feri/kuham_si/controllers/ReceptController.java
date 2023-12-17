package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Recept;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.repository.ReceptRepository;

@RestController
@RequestMapping("/recept")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceptController {
    @Autowired
    private ReceptRepository receptDao;

    @PostMapping("/ustvari-recept")
    public Recept dodajRecept(@RequestBody Recept recept) {
        return receptDao.save(recept);
    }
}
