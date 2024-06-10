package dw.movieDic.Repository;

import dw.movieDic.Model.Purchase;
import dw.movieDic.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    // JPA method 명명법에 ㅡ이거하여 올바를 작명을 해야 함!!
    // 스펙에 명시된 명명법을 제대로 따르기만 하면 JPA가 스펙의 규칙대로 구동함
    List<Purchase> findByUser(User user);
}
