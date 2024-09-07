package dw.movieDic.Repository;

import dw.movieDic.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserId(String userID);
    Optional<User> findByRealName(String userName);

    @Query("SELECT u.userId, u.birthday, u.dateJoined, u.email, u.gender, u.realName, u.authority.authorityName FROM User u")
    List<Object[]> getUserInfo();
}
