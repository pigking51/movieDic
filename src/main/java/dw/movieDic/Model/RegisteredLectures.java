package dw.movieDic.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name="registered_lectures")
public class RegisteredLectures {
    @Id
    @Column(name="register_id", length=20)
    private Long registerId;
    @Column(name="registered_time")
    private LocalDateTime registeredTime;
}
