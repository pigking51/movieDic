package dw.movieDic.Repository;

import dw.movieDic.Model.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQRepository extends JpaRepository<FAQ , Long> {
}
