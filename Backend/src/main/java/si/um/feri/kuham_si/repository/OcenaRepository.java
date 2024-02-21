package si.um.feri.kuham_si.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import si.um.feri.kuham_si.models.Ocena;

import java.util.List;
import java.util.Optional;

public interface OcenaRepository extends JpaRepository<Ocena, Long> {
    Iterable<Ocena> findAllByRecept_Id(Long receptId);
    Optional<Ocena> findById(Long id);
    List<Ocena> findByReceptId(Long id);
}
