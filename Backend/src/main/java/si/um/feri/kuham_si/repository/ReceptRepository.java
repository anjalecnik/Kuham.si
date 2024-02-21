package si.um.feri.kuham_si.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import si.um.feri.kuham_si.models.Recept;

import java.util.List;

public interface ReceptRepository extends CrudRepository<Recept, Long> {
    List<Recept> findAll();
}