package si.um.feri.kuham_si.repository;

import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.Uporabnik;

import java.util.Optional;

public interface UporabnikRepository extends CrudRepository<Uporabnik, Long> {
    Optional<Uporabnik> findByUporabniskoImeAndGeslo(String uporabniskoIme, String geslo);
}
