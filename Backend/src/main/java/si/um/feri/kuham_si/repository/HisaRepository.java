package si.um.feri.kuham_si.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.Hisa;

import java.util.List;

public interface HisaRepository extends CrudRepository<Hisa, Long> {

    /*@Query("select distinct h from Hisa h join h.sobe s where s.velikost >= :velikost")
    List<Hisa> vrniHisePoVelikostiSob(double velikost);*/
}

