package dw.movieDic.Service;


import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Board;
import dw.movieDic.Repository.BoardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BoardService {

    @Autowired
    BoardRepository boardRepository;
    public List<Board> getAllBoards(){
        return boardRepository.findAll();
    }

}
