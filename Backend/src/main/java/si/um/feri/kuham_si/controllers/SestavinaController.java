package si.um.feri.kuham_si.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Sestavina;
import si.um.feri.kuham_si.models.dto.EdmamRequestIngredient;
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

    @GetMapping("/edmam-api")
    public Iterable<Sestavina> sestavineBrezEdmamAPIPodatkov() {
        return sestavinaDao.findAllByEdmamPodatkiIsNull();
    }

    @PostMapping("/ustvari-sestavino")
    public Sestavina ustvariSestavino(@RequestBody Sestavina sestavina) {
        return sestavinaDao.save(sestavina);
    }

    @PostMapping("/shrani-edmam-podatke")
    public void shraniEdmamPodatke(@RequestBody EdmamRequestIngredient[] edmamRequestIngredients) {
        for (EdmamRequestIngredient ingredient : edmamRequestIngredients) {
            Sestavina sestavina = sestavinaDao.findByNazivAndKolicina(ingredient.getFood(), ingredient.getQuantity());
            sestavina.setEdmamPodatki(ingredient.toString());
            sestavinaDao.save(sestavina);
        }
    }
}
