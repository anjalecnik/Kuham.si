package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Sestavina;
import si.um.feri.kuham_si.repository.SestavinaRepository;

@RestController
@RequestMapping("/sestavina")
@CrossOrigin(origins = "http://localhost:3000")
public class SestavinaController {
    @Autowired
    private SestavinaRepository sestavinaDao;

    @GetMapping
    public Iterable<Sestavina> vrniSestavine() {
        return sestavinaDao.findAll();
    }

    @PostMapping("/ustvari-sestavino")
    public Sestavina ustvariSestavino(@RequestBody Sestavina sestavina) {
        return sestavinaDao.save(sestavina);
    }
}
