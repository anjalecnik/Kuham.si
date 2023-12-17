package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import si.um.feri.kuham_si.repository.SeznamSestavinRepository;

@RestController
@RequestMapping("/seznam-sestavin")
@CrossOrigin(origins = "http://localhost:3000")
public class SeznamSestavinController {
    @Autowired
    private SeznamSestavinRepository seznamSestavinDao;
}
