package si.um.feri.kuham_si.models.dto;

import si.um.feri.kuham_si.models.Recept;
import si.um.feri.kuham_si.models.SeznamSestavin;

public class ReceptResponse {
    private Recept recept;
    private Iterable<SeznamSestavin> seznamSestavin;

    public Recept getRecept() {
        return recept;
    }

    public void setRecept(Recept recept) {
        this.recept = recept;
    }


    public Iterable<SeznamSestavin> getSeznamSestavin() {
        return seznamSestavin;
    }

    public void setSeznamSestavin(Iterable<SeznamSestavin> seznamSestavin) {
        this.seznamSestavin = seznamSestavin;
    }
}
