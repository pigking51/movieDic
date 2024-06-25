package dw.movieDic.Controller;

import dw.movieDic.Dto.LikeDto;
import dw.movieDic.Model.Like;
import dw.movieDic.Service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("like")
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping("/save")
    ResponseEntity<LikeDto> saveAddLike(@RequestBody LikeDto likeDto){
        return new ResponseEntity<>(likeService.saveAddLike(likeDto),
                HttpStatus.OK);
    }

    @GetMapping("/all")
    ResponseEntity<List<Like>> getAllLikes(){
        return new ResponseEntity<>(likeService.getAllLikes(),
                HttpStatus.OK);
    }
}
