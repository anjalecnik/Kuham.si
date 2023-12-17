package si.um.feri.kuham_si.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Soba {
    private double velikost;
    private String ime;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hisa_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore //ko strežnik vrača rezultat, tega property-ja ne vrača
    Hisa hisa;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public double getVelikost() {
        return velikost;
    }

    public void setVelikost(double velikost) {
        this.velikost = velikost;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public Hisa getHisa() {
        return hisa;
    }

    public void setHisa(Hisa hisa) {
        this.hisa = hisa;
    }
}
