package si.um.feri.kuham_si.models;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.util.Date;


@CrossOrigin(origins = "http://localhost:3000")
@Entity
public class Kuharji {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String ime;
    private String priimek;

    private Date datumRojstva;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kuhinja_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Kuhinja kuhinja;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recept_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Recept recept;


    // Dodajte druge poljubne atribute, če je potrebno

    public Long getId() {
        return id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPriimek() {
        return priimek;
    }

    public void setPriimek(String priimek) {
        this.priimek = priimek;
    }

    public Date getDatumRojstva() {
        return datumRojstva;
    }

    public void setDatumRojstva(Date datumRojstva) {
        this.datumRojstva = datumRojstva;
    }
}
