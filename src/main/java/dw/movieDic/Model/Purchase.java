package dw.movieDic.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @ManyToOne
    @JoinColumn(name="lecture_id")
    private Lectures lectures;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column(name="purchase_time")
    private LocalDateTime purchaseTime;
}
