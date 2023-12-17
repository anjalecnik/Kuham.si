package si.um.feri.kuham_si.models;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
public class Hisa {
    private int hisna_stevilka;
    private String naslov;
    private double velikost;
    private boolean vrt;

    @OneToMany(mappedBy = "hisa", fetch = FetchType.LAZY, cascade = CascadeType.ALL) // fetch je opcijski
    Collection<Soba> soba;

    public int getHisna_stevilka() {
        return hisna_stevilka;
    }

    public void setHisna_stevilka(int hisna_stevilka) {
        this.hisna_stevilka = hisna_stevilka;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public double getVelikost() {
        return velikost;
    }

    public void setVelikost(double velikost) {
        this.velikost = velikost;
    }

    public boolean isVrt() {
        return vrt;
    }

    public void setVrt(boolean vrt) {
        this.vrt = vrt;
    }

    public Collection<Soba> getSoba() {
        return soba;
    }

    public void setSoba(Collection<Soba> soba) {
        this.soba = soba;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // da se avtomatsko generira
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
