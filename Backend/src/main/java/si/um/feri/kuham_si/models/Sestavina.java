package si.um.feri.kuham_si.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@Entity
public class Sestavina {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String naziv;
    private double teza;
    private String enota;
    private String kaloricna_vrednost;

    public Long getId() {
        return id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public double getTeza() {
        return teza;
    }

    public void setTeza(double teza) {
        this.teza = teza;
    }

    public String getEnota() {
        return enota;
    }

    public void setEnota(String enota) {
        this.enota = enota;
    }

    public String getKaloricna_vrednost() {
        return kaloricna_vrednost;
    }

    public void setKaloricna_vrednost(String kaloricna_vrednost) {
        this.kaloricna_vrednost = kaloricna_vrednost;
    }
}
