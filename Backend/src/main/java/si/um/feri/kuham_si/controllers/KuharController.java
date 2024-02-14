package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Kuhar;
import si.um.feri.kuham_si.models.dto.LogInRequest;
import si.um.feri.kuham_si.repository.KuharRepository;

@RestController
@RequestMapping("/kuhar")
@CrossOrigin(origins = "http://localhost:3000")
public class KuharController {
    @Autowired
    private KuharRepository kuharDao;

    @PostMapping("/log-in")
    public long logIn(@RequestBody LogInRequest logInRequest) {
        Kuhar kuhar = kuharDao.findByUporabniskoImeAndGeslo(
                logInRequest.getUporabniskoIme(),
                logInRequest.getGeslo()
        ).orElseThrow(() -> new EntityNotFoundException("Napačno ime ali geslo"));

        return kuhar.getId();
    }

    @PostMapping("/register")
    public long register(@RequestBody Kuhar kuhar) {
        return kuharDao.save(kuhar).getId();
    }
}
