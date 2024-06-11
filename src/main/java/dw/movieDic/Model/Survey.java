package dw.movieDic.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "survey")
public class Survey {

    @Id
    @Column(name = "survey_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long surveyId;
    @Column(name = "answer1", nullable = false)
    private int answer1;
    @Column(name = "answer2", nullable = false)
    private String answer2;
    @Column(name = "answer3", nullable = false)
    private String answer3;
    @Column(name = "answer4", nullable = false)
    private String answer4;
    @Column(name = "answer5", nullable = false)
    private String answer5;
    @OneToOne
    @JoinColumn(name="user_id")
    private User userId;

}
