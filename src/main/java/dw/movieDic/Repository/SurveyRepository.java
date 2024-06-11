package dw.movieDic.Repository;

import dw.movieDic.Model.Survey;
import dw.movieDic.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, String> {
    Optional<User> findByUserId(User userId);
}
