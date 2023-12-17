package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Hisa;
import si.um.feri.kuham_si.repository.HisaRepository;

@RestController
@RequestMapping("/hise")
@CrossOrigin(origins = "http://localhost:3000")
public class HisaController {
    @Autowired      // poskrbi, da se ob inicializaciji določi vrednost hisaDao itd.
    private HisaRepository hisaDao;

    @GetMapping("/hello")
    public String hello() {
        return "Hello hiša test";
    }

    @PostMapping
    public ResponseEntity<Hisa> dodajHiso(@RequestBody Hisa hisa) {
        Hisa hisa_res = hisaDao.save(hisa);  // hišo, ki jo dobimo preko telesa zahteve, shranimo (save == insert)
        return new ResponseEntity(hisa_res, HttpStatus.CREATED);
    }

    @GetMapping // branje
    public Iterable<Hisa> vrniHise() {
        return hisaDao.findAll();
    }

    /*@GetMapping("/velikost-sob/{velikost}")
    public Iterable<Hisa> vrniHisePoVelikosti(@PathVariable(name = "velikost") double velikost) {   //Iterable - seznam
        return hisaDao.vrniHisePoVelikostiSob(velikost);
    }*/
}
