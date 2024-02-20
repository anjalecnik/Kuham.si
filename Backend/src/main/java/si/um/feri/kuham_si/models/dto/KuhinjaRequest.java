package si.um.feri.kuham_si.models.dto;

import java.util.Date;

public class KuhinjaRequest {
    private String naziv;
    private String lokacija;
    private Date datumNastanka;
    private String tipKuhinje;
    private Long idAvtorja;

    public String getNaziv() {
        return naziv;
    }

    public String getLokacija() {
        return lokacija;
    }

    public Date getDatumNastanka() {
        return datumNastanka;
    }

    public String getTipKuhinje() {
        return tipKuhinje;
    }

    public Long getIdAvtorja() {
        return idAvtorja;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public void setLokacija(String lokacija) {
        this.lokacija = lokacija;
    }

    public void setDatumNastanka(Date datumNastanka) {
        this.datumNastanka = datumNastanka;
    }

    public void setTipKuhinje(String tipKuhinje) {
        this.tipKuhinje = tipKuhinje;
    }

    public void setIdAvtorja(Long idAvtorja) {
        this.idAvtorja = idAvtorja;
    }
}
