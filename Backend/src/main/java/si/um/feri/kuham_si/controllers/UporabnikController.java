package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.models.dto.LogInRequest;
import si.um.feri.kuham_si.repository.UporabnikRepository;

@RestController
@RequestMapping("/uporabnik")
@CrossOrigin(origins = "http://localhost:3000")
public class UporabnikController {
    @Autowired
    private UporabnikRepository uporabnikDao;

    @PostMapping("/log-in")
    public long logIn(@RequestBody LogInRequest logInRequest) {
        Uporabnik uporabnik = uporabnikDao.findByUporabniskoImeAndGeslo(
                logInRequest.getUporabniskoIme(),
                logInRequest.getGeslo()
        ).orElseThrow(() -> new EntityNotFoundException("Napačno ime ali geslo"));

        return uporabnik.getId();
    }

    @PostMapping("/register")
    public long register(@RequestBody Uporabnik uporabnik) {
        return uporabnikDao.save(uporabnik).getId();
    }
}
