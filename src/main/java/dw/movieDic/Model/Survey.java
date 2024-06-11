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
    @Column(name = "survey_question", nullable = false)
    private String surveyQuestion;
    @Column(name = "answer", nullable = false)
    private int answer;
    @OneToOne
    @JoinColumn(name="user_id")
    private User userId;

}
