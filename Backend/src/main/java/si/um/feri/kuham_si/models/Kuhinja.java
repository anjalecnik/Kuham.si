package si.um.feri.kuham_si.models;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@CrossOrigin(origins = "http://localhost:3000")
@Entity
public class Kuhinja {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String naziv;

    private String lokacija;

    private Date datumNastanka;

    private String tipKuhinje;

    private String lastnik;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getLokacija() {
        return lokacija;
    }

    public void setLokacija(String lokacija) {
        this.lokacija = lokacija;
    }

    public Date getDatumNastanka() {
        return datumNastanka;
    }

    public void setDatumNastanka(Date datumNastanka) {
        this.datumNastanka = datumNastanka;
    }

    public String getTipKuhinje() {
        return tipKuhinje;
    }

    public void setTipKuhinje(String tipKuhinje) {
        this.tipKuhinje = tipKuhinje;
    }

    public String getLastnik() {
        return lastnik;
    }

    public void setLastnik(String lastnik) {
        this.lastnik = lastnik;
    }
}
