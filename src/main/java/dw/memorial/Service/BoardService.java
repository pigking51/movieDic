package dw.memorial.Service;


import dw.memorial.Model.Board;
import dw.memorial.Repository.BoardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class BoardService {

    @Autowired
    BoardRepository boardRepository;
    public List<Board> getAllBoards(){
        return boardRepository.findAll();
    }

}
