package dw.memorial.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @Column(name = "board_name", nullable = false, unique = true, length = 100)
    private String boardName;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private Set<Post> posts;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private Set<Comment> comments;
}
