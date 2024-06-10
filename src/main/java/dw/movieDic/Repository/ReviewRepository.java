package dw.movieDic.Repository;

import dw.movieDic.Model.LectureReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<LectureReview, Long> {
}
