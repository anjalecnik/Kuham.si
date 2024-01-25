package si.um.feri.kuham_si.models.dto;

import java.util.Date;

public class OcenaRequest {
    private int ocena;
    private String komentar;
    private Long idAvtorja;
    private Long idRecepta;
    private Date datum;

    public int getOcena() {
        return ocena;
    }

    public String getKomentar() {
        return komentar;
    }

    public Long getIdAvtorja() {
        return idAvtorja;
    }

    public Long getIdRecepta() {
        return idRecepta;
    }

    public Date getDatum() {
        return datum;
    }

    public void setOcena(int ocena) {
        this.ocena = ocena;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }

    public void setIdAvtorja(Long idAvtorja) {
        this.idAvtorja = idAvtorja;
    }

    public void setIdRecepta(Long idRecepta) {
        this.idRecepta = idRecepta;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }
}
