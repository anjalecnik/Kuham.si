package si.um.feri.kuham_si.models.dto;

import java.util.HashMap;
import java.util.Map;

public class ReceptRequest {
    private String naziv;
    private String opis;
    private Map<Long, Integer> sestavineSKolicinami = new HashMap<>();
    private Long idAvtorja;

    public String getNaziv() {
        return naziv;
    }

    public String getOpis() {
        return opis;
    }

    public Long getIdAvtorja() {
        return idAvtorja;
    }

    public Map<Long, Integer> getSestavineSKolicinami() {
        return sestavineSKolicinami;
    }
}
