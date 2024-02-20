package si.um.feri.kuham_si.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
public class Kuhinja1 {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String naziv;
    private String lokacija;
    private Date datumNastanka;
    private String tipKuhinje;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avtor_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Uporabnik avtor;

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

    public void setAvtor(Uporabnik avtor) {
        this.avtor = avtor;
    }

    public Uporabnik getAvtor() {
        return avtor;
    }

    public Long getId() {
        return id;
    }
}