package si.um.feri.kuham_si.repository;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.SeznamSestavin;

public interface SeznamSestavinRepository extends CrudRepository<SeznamSestavin, Long> {
    Iterable<SeznamSestavin> findAllByRecept_Id(Long receptId);
}
