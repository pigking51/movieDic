package dw.memorial.Repository;

import dw.memorial.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Object> {

    @Query("SELECT p.postId, p.postTitle, p.user.userId, p.createdAt, p.postContent FROM Post p")
    List<Object[]> getPostInfo();

}
