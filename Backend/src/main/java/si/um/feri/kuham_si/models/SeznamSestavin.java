package si.um.feri.kuham_si.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class SeznamSestavin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int kolicina;
    private String merska_enota;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recept_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Recept recept;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sestavina_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Sestavina sestavina;
}
