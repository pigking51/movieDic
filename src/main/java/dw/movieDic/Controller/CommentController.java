package dw.movieDic.Controller;

import dw.movieDic.Dto.CommentDto;
import dw.movieDic.Dto.PostDto;
import dw.movieDic.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
