package si.um.feri.kuham_si.repository;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.PriljubljeniRecepti;

public interface PriljubljeniReceptiRepository extends CrudRepository<PriljubljeniRecepti, Long> {
    Iterable<PriljubljeniRecepti> findByUporabnik_Id(Long uporabnikId);
}