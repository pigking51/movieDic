package dw.movieDic.Service;

import dw.movieDic.Model.Like;
import dw.movieDic.Repository.LikeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LikeService {

    @Autowired
    LikeRepository likeRepository;

//    public Like saveAddLike(Like like){
//        return likeRepository.
//    }
}
