package dw.movieDic.Controller;

import dw.movieDic.Model.Like;
import dw.movieDic.Service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("like")
public class LikeController {

    @Autowired
    LikeService likeService;

//    @PostMapping("/save")
//    ResponseEntity<Like> saveAddLike(@RequestBody Like like){
//        return new ResponseEntity<>(saveAddLike(like),
//                HttpStatus.OK);
//    }
}
