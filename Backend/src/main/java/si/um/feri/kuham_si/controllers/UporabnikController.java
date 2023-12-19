package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.repository.UporabnikRepository;

@RestController
@RequestMapping("/uporabnik")
@CrossOrigin(origins = "http://localhost:3000")
public class UporabnikController {
    @Autowired
    private UporabnikRepository uporabnikDao;
}
