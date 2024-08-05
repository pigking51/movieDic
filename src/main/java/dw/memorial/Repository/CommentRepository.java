package dw.memorial.Repository;

import dw.memorial.Model.Comment;
import dw.memorial.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

//    Comment findByCommentIdAndPostAndUser(long commentId, long post, String user);

    List<Comment> findAllByUser(User userId);
}
