package si.um.feri.kuham_si.repository;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.Soba;

public interface SobaRepository extends CrudRepository<Soba, Long>{
    // vračali se bodo objekti tipa Soba in long

}
