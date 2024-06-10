package dw.movieDic.Repository;

import dw.movieDic.Model.Lectures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<Lectures, Long> {
    // Repository에서 JPQL 사용법 : @Query 어노테이션을 사용함
//    @Query("select g1 from Lectures g1 where g1.price = (select max(g2.price) from Game g2)")
//    public Lectures getGameWithMaxPrice();
//
//    @Query("select g1 from Lectures g1 order by g1.price desc")
//    public List<Lectures> getGameWithMaxPriceTop3();
}
