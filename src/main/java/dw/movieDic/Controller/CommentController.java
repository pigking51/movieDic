package dw.movieDic.Controller;

import dw.movieDic.Dto.CommentDto;
import dw.movieDic.Dto.PostDto;
import dw.movieDic.Model.Comment;
import dw.movieDic.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<CommentDto> saveComment(@RequestBody CommentDto commentDto) {
        CommentDto savedCommentDto = commentService.saveComment(commentDto);
        return new ResponseEntity<>(savedCommentDto, HttpStatus.OK);
    }

    @GetMapping("/commentAll")
    public ResponseEntity<List<Comment>> showAllComments(){
        return new ResponseEntity<>(commentService.showAllComments(),
                HttpStatus.OK);
    }
}
