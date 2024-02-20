package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Kuhinja1;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.repository.KuhinjaRepository;
import si.um.feri.kuham_si.models.dto.KuhinjaRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import si.um.feri.kuham_si.repository.UporabnikRepository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/kuhinja")
@CrossOrigin(origins = "http://localhost:3000")
public class KuhinjaController {

    @Autowired
    private KuhinjaRepository kuhinjaDao;

    @Autowired
    private UporabnikRepository uporabnikDao;

    @GetMapping
    public Iterable<Kuhinja1> vrniKuhinje() {
        Iterable<Kuhinja1> kuhinje = kuhinjaDao.findAll();

        // Preveri, ali vsaka kuhinja vsebuje ID
        for (Kuhinja1 kuhinja : kuhinje) {
            if (kuhinja.getId() == null) {
                // Če kuhinja nima ID-ja, vrni napako ali jo ustrezno obdelaj
            }
        }

        return kuhinje;
    }

    @PostMapping("/ustvari-kuhinjo")
    public ResponseEntity<Map<String, Object>> dodajKuhinjo(@RequestBody KuhinjaRequest kuhinjaRequest) {
        Long avtorId = kuhinjaRequest.getIdAvtorja();
        Uporabnik uporabnik = uporabnikDao.findById(avtorId)
                .orElseThrow(() -> new EntityNotFoundException("Uporabnik z id " + avtorId + " ne obstaja"));

        Kuhinja1 kuhinja = new Kuhinja1();
        kuhinja.setNaziv(kuhinjaRequest.getNaziv());
        kuhinja.setLokacija(kuhinjaRequest.getLokacija());
        kuhinja.setDatumNastanka(kuhinjaRequest.getDatumNastanka());
        kuhinja.setTipKuhinje(kuhinjaRequest.getTipKuhinje());
        kuhinja.setAvtor(uporabnik);

        kuhinjaDao.save(kuhinja);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "Kuhinja uspešno dodana");
        responseBody.put("kuhinja", kuhinja); // Dodamo podrobnosti nove kuhinje

        // Vrnemo ResponseEntity s statusom OK (200) in telom odgovora
        return ResponseEntity.ok(responseBody);
    }

    @DeleteMapping("/izbrisi-kuhinjoId/{id}")
    public void izbrisiKuhinjo(@PathVariable Long id) {
        try {
            kuhinjaDao.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @DeleteMapping("/izbrisi-kuhinjo/{naziv}")
    public ResponseEntity<String> izbrisiKuhinjo(@PathVariable String naziv) {
        try {
            Optional<Kuhinja1> kuhinjaOptional = kuhinjaDao.findByNaziv(naziv);
            if (kuhinjaOptional.isPresent()) {
                Kuhinja1 kuhinja = kuhinjaOptional.get();
                kuhinjaDao.delete(kuhinja);
                return ResponseEntity.ok("Kuhinja uspešno izbrisana.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kuhinja s podanim nazivom ne obstaja.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Napaka pri brisanju kuhinje: " + e.getMessage());
        }
    }


    @PutMapping("/posodobi-kuhinjoId/{id}")
    public void posodobiKuhinjo(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        try {
            Optional<Kuhinja1> optionalKuhinja = kuhinjaDao.findById(id);

            if (optionalKuhinja.isPresent()) {
                Kuhinja1 kuhinja = optionalKuhinja.get();

                if (requestBody.containsKey("datumNastanka")) {
                    Date datumNastanka = (Date) requestBody.get("datumNastanka");
                    kuhinja.setDatumNastanka(datumNastanka);
                }

                if (requestBody.containsKey("lokacija")) {
                    String lokacija = (String) requestBody.get("lokacija");
                    kuhinja.setLokacija(lokacija);
                }

                if (requestBody.containsKey("naziv")) {
                    String naziv = (String) requestBody.get("naziv");
                    kuhinja.setNaziv(naziv);
                }

                if (requestBody.containsKey("tipKuhinje")) {
                    String tipKuhinje = (String) requestBody.get("tipKuhinje");
                    kuhinja.setTipKuhinje(tipKuhinje);
                }

                kuhinjaDao.save(kuhinja);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/posodobi-kuhinjo/{naziv}")
    public void posodobiKuhinjo(@PathVariable String naziv, @RequestBody Map<String, Object> requestBody) {
        try {
            Optional<Kuhinja1> optionalKuhinja = kuhinjaDao.findByNaziv(naziv);

            if (optionalKuhinja.isPresent()) {
                Kuhinja1 kuhinja = optionalKuhinja.get();

                if (requestBody.containsKey("datumNastanka")) {
                    Date datumNastanka = (Date) requestBody.get("datumNastanka");
                    kuhinja.setDatumNastanka(datumNastanka);
                }

                if (requestBody.containsKey("lokacija")) {
                    String lokacija = (String) requestBody.get("lokacija");
                    kuhinja.setLokacija(lokacija);
                }

                if (requestBody.containsKey("tipKuhinje")) {
                    String tipKuhinje = (String) requestBody.get("tipKuhinje");
                    kuhinja.setTipKuhinje(tipKuhinje);
                }

                kuhinjaDao.save(kuhinja);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}