package si.um.feri.kuham_si.repository;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.Kuhar;

import java.util.Optional;

public interface KuharRepository extends CrudRepository<Kuhar, Long> {
    Optional<Kuhar> findByUporabniskoImeAndGeslo(String uporabniskoIme, String geslo);
    Optional<Kuhar> findById(Long id);
    Kuhar findByIme(String imeLastnika);
}
