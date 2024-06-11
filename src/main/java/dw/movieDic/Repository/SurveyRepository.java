package dw.movieDic.Repository;

import dw.movieDic.Model.Survey;
import dw.movieDic.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    Optional<Survey> findByUserId(String userID);
}
