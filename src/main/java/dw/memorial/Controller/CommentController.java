package dw.memorial.Controller;

import dw.memorial.Dto.CommentDto;
import dw.memorial.Model.Comment;
import dw.memorial.Service.CommentService;
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

    @PatchMapping("/changecomment/{commentId}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable long commentId,
                                                 @RequestBody CommentDto commentDto){
        return new ResponseEntity<>(commentService.updateComment(commentId, commentDto),
                HttpStatus.OK);
    }

    @PatchMapping("/changecomment2/{commentId}")
    public ResponseEntity<CommentDto> updateComment2(@PathVariable long commentId,
                                                     @RequestBody CommentDto commentDto){
        return new ResponseEntity<>(commentService.updateComment2(commentId, commentDto),
                HttpStatus.OK);
    }

    @DeleteMapping("/deletecomment/{commentId}")
    public ResponseEntity<CommentDto> deleteComment(@PathVariable long commentId){
        return new ResponseEntity<>(commentService.deleteComment(commentId),
                HttpStatus.OK);
    }


}
