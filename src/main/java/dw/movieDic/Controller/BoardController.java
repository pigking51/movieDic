package dw.movieDic.Controller;


import dw.movieDic.Model.Board;
import dw.movieDic.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {
    @Autowired
    BoardService boardService;

    @GetMapping("/allboards")
    public ResponseEntity<List<Board>> getAllBoards(){
        return new ResponseEntity<>(boardService.getAllBoards(),
                HttpStatus.OK);
    }
}
