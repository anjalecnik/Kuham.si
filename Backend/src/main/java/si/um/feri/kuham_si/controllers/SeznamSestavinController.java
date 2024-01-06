package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.SeznamSestavin;
import si.um.feri.kuham_si.repository.SeznamSestavinRepository;

@RestController
@RequestMapping("/seznam-sestavin")
@CrossOrigin(origins = "http://localhost:3000")
public class SeznamSestavinController {
    @Autowired
    private SeznamSestavinRepository seznamSestavinDao;

    @GetMapping("/pridobi-sestavine-recepta")
    public Iterable<SeznamSestavin> vrniSeznamSestavin(@RequestParam Long receptId) {
        Iterable<SeznamSestavin> seznamSestavin = seznamSestavinDao.findAllByRecept_Id(receptId);
        return seznamSestavin;
    }
}
