package si.um.feri.kuham_si.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.util.Date;

@Entity
public class Ocena {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String komentar;
    private int ocena;
    private Date datum;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avtor_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Uporabnik avtor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recept_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Recept recept;

    public String getKomentar() {
        return komentar;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }

    public int getOcena() {
        return ocena;
    }

    public void setOcena(int ocena) {
        this.ocena = ocena;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public Uporabnik getAvtor() {
        return avtor;
    }

    public void setRecept(Recept recept) {
        this.recept = recept;
    }

    public Recept getRecept() {
        return recept;
    }

    public void setAvtor(Uporabnik avtor) {
        this.avtor = avtor;
    }

    public Long getId() {
        return id;
    }
}
