package dw.movieDic.Repository;

import dw.movieDic.Model.Lectures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LecturesRepository extends JpaRepository<Lectures, Object> {
    // Repository에서 JPQL 사용법 : @Query 어노테이션 사용
//    @Query("select g1 from Lectures g1 where g1.price = (select max(g2.price) from Lectures g2)")
//    public Lectures getLectureWithMaxPrice();
//
//    @Query("select g1 from Lectures g1 order by g1.price desc")
//    public List<Lectures> getLectureWithMAxPriceTop3();
}
