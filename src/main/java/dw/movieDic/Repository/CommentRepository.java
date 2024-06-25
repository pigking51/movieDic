package dw.movieDic.Repository;

import dw.movieDic.Model.Comment;
import dw.movieDic.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

//    Comment findByCommentIdAndPostAndUser(long commentId, long post, String user);

    List<Comment> findAllByUser(User userId);
}
