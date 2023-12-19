package si.um.feri.kuham_si.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Recept {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String naziv;
    private String opis;
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

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Uporabnik getAvtor() {
        return avtor;
    }

    public void setAvtor(Uporabnik avtor) {
        this.avtor = avtor;
    }

    public Long getId() {
        return id;
    }
}
