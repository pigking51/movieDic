package dw.movieDic.Repository;

import dw.movieDic.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p.postId, p.postTitle, p.user.userId, p.createdAt, p.postContent FROM Post p")
    List<Object[]> getPostInfo();

}
