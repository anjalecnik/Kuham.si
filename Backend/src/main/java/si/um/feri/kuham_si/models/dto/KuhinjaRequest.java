package si.um.feri.kuham_si.models.dto;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class KuhinjaRequest {
    private String naziv;

    private String lokacija;

    private Date datumNastanka;

    private String tipKuhinje;
    private Map<Long, Integer> sestavineSKolicinami = new HashMap<>();
    private Long idLastnika;

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

    public Map<Long, Integer> getSestavineSKolicinami() {
        return sestavineSKolicinami;
    }

    public void setSestavineSKolicinami(Map<Long, Integer> sestavineSKolicinami) {
        this.sestavineSKolicinami = sestavineSKolicinami;
    }

    public Long getIdLastnika() {
        return idLastnika;
    }

    public void setIdLastnika(Long idLastnika) {
        this.idLastnika = idLastnika;
    }
}
