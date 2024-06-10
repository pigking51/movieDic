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
@Table(name="lectures")
public class Lectures {
    @Id
    @Column(name="lecture_id", nullable = false, length=20)
    private Long lectureId;
    @Column(name="lecture_title", nullable = false, length=100)
    private String lectureTitle;
    @Column(name="image")
    private String image;
    @Column(name="price", length=11)
    private int Price;
    @Column(name="lecture_explanation")
    private String lectureExplanation;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User userId;




}
