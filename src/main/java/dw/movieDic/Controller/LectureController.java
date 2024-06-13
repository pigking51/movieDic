package dw.movieDic.Controller;


import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Lectures;
import dw.movieDic.Repository.LectureRepository;
import dw.movieDic.Service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lectures")
public class LectureController {
    @Autowired
    LectureService lectureService;

    @Autowired
    LectureRepository lectureRepository;

    @GetMapping("/getalllectures")
    public ResponseEntity<List<Lectures>> getAllLectures(){
        return new ResponseEntity<>(lectureService.getAllLectures(),
                HttpStatus.OK);
    }

    public Lectures getLectureById(long id) {
        Optional<Lectures> lecturesOptional = lectureRepository.findById(id);
        if(lecturesOptional.isPresent()) {
            return lecturesOptional.get();
        }else {
            throw new ResourceNotFoundException("Lecture", "ID", id);
        }
    }

//    public Lectures updateLectureById(long id, Lectures lectures) {
//        Optional<Lectures> lecturesOptional = lectureRepository.findById(id);
//        if(lecturesOptional.isPresent()) {
//            Lectures temp = lecturesOptional.get();
//            temp.s(game.getTitle());
//            temp.setGenre(game.getGenre());
//            temp.setPrice(game.getPrice());
//            temp.setImage(game.getImage());
//            temp.setText(game.getText());
//            gameShopRepository.save(temp);
//            return temp;
//        }else {
//            throw new ResourceNotFoundException("Game", "ID", id);
//        }
//    }

}
