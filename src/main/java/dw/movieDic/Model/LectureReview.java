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
@Table(name="lecture_review")
public class LectureReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private long id;
    @ManyToOne
    @JoinColumn(name="lecture")
    private Lectures lectures;
    @ManyToOne
    @JoinColumn(name="user")
    private User user;
    @Column(name= "point", nullable = false)
    private int point;
    @Column(name= "review_text", length=65535)
    private String reviewText;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
