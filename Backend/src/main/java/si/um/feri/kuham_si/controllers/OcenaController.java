package si.um.feri.kuham_si.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import si.um.feri.kuham_si.models.Ocena;
import si.um.feri.kuham_si.models.Recept;
import si.um.feri.kuham_si.models.Uporabnik;
import si.um.feri.kuham_si.repository.ReceptRepository;
import si.um.feri.kuham_si.models.dto.OcenaRequest;
import si.um.feri.kuham_si.repository.OcenaRepository;
import si.um.feri.kuham_si.repository.UporabnikRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/ocena")
@CrossOrigin(origins = "http://localhost:3000")
public class OcenaController {

    @Autowired
    private OcenaRepository ocenaDao;

    @Autowired
    private UporabnikRepository uporabnikDao;

    @Autowired
    private ReceptRepository receptDao;
    @Autowired
    private JavaMailSender javaMailSender;

    @GetMapping
    public Iterable<Ocena> vrniOcene() {
        Iterable<Ocena> ocene = ocenaDao.findAll();
        return ocene;
    }

    @PostMapping("/ustvari-oceno")
    public Map<String, Object> dodajOceno(@RequestBody OcenaRequest ocenaRequest) {
        Long avtorId = ocenaRequest.getIdAvtorja();
        Uporabnik uporabnik = uporabnikDao.findById(avtorId)
                .orElseThrow(() -> new EntityNotFoundException("Uporabnik z id " + avtorId + " ne obstaja"));

        Recept recept = receptDao.findById(ocenaRequest.getIdRecepta())
                .orElseThrow(() -> new EntityNotFoundException("Recept z id " + ocenaRequest.getIdRecepta() + " ne obstaja"));

        Ocena ocena = new Ocena();
        ocena.setDatum(ocenaRequest.getDatum());
        ocena.setOcena(ocenaRequest.getOcena());
        ocena.setKomentar(ocenaRequest.getKomentar());
        ocena.setAvtor(uporabnik);
        ocena.setRecept(recept);

        ocenaDao.save(ocena);

        // Print e-poštni naslov avtorja recepta
        System.out.println("E-poštni naslov avtorja recepta: " + recept.getAvtor().getEmail());

        // Send email to the author of the recipe
        String naslov = "Nekdo je ocenil vaš recept!";
        String sporocilo = "Pozdravljeni " + recept.getAvtor().getIme() + ",\n\nVašemu receptu \"" + recept.getNaziv() + "\" je bila dodana nova ocena.\n\nLep pozdrav,\nVaša ekipa Kuham.si";

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(recept.getAvtor().getEmail());
            message.setSubject(naslov);
            message.setText(sporocilo);
            javaMailSender.send(message);

            System.out.println("Email successfully sent to " + recept.getAvtor().getEmail());
        } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
        }

        // Response preparation
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Ocena uspešno ustvarjena");

        return response;
    }

    @GetMapping("/pridobi-ocene-za-recept")
    public Iterable<Ocena> vrniOceneZaRecept(@RequestParam Long receptId) {
        Iterable<Ocena> ocene = ocenaDao.findAllByRecept_Id(receptId);
        return ocene;
    }

    @DeleteMapping("/ocena/izbrisi-oceno/{id}")
    public void izbrisiOceno(@PathVariable Long id) {
        try {
            ocenaDao.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/ocena/posodobi-oceno/{id}")
    public void posodobiOceno(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        try {
            Optional<Ocena> optionalOcena = ocenaDao.findById(id);

            if (optionalOcena.isPresent()) {
                Ocena ocena = optionalOcena.get();

                if (requestBody.containsKey("novaOcena")) {
                    int novaOcena = (int) requestBody.get("novaOcena");
                    ocena.setOcena(novaOcena);
                }

                if (requestBody.containsKey("komentar")) {
                    String komentar = (String) requestBody.get("komentar");
                    ocena.setKomentar(komentar);
                }

                ocenaDao.save(ocena);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}