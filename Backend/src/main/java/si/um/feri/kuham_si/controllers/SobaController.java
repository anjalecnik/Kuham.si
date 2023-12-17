package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Soba;
import si.um.feri.kuham_si.repository.HisaRepository;
import si.um.feri.kuham_si.repository.SobaRepository;

import java.util.Optional;

@RestController
@RequestMapping("/sobe")
public class SobaController {
    @Autowired
    private SobaRepository sobaDao;
    @Autowired
    private HisaRepository hisaDao;

    @GetMapping("/hello")
    public String hello() {
        return "Hello soba";
    }

    @GetMapping
    public Iterable<Soba> vrniSobe() {
        return sobaDao.findAll();
    }

    @PostMapping("/{id_hise}")
    public Optional<Soba> dodajSobo(@RequestBody Soba soba, // napako, da hiša ne obstaja, vrnemo
                                    @PathVariable(name = "id_hise") Long id) {    // preko name id_hise, je tipa Long, naj bo shranjen kot id
        return hisaDao.findById(id).map(hisa -> { // za vse, kar dobi iz findById, izvede kodo znotraj () - za izogib asinhronosti
           soba.setHisa(hisa);
           return sobaDao.save(soba);
        });
    }
}
