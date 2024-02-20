package si.um.feri.kuham_si.repository;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.Kuhinja1;

import java.util.Optional;

public interface KuhinjaRepository extends CrudRepository<Kuhinja1, Long> {
    Optional<Kuhinja1> findById(Long id);
    Optional<Kuhinja1> findByNaziv(String naziv);
}