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
@Table(name = "lectures")
public class Lectures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_id")
    private Long lectureId;

    @Column(name = "lecture_title", nullable = false, length = 200)
    private String lectureTitle;

    @Column(name = "major", nullable = false, length = 100)
    private String major;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "image", nullable = false, length = 65535)
    private String image;

    @Column(name = "description_text", length = 65535)
    private String text;

    @Column(name = "lecture_url", nullable = false, length = 65535)
    private String lectureUrl;

}
