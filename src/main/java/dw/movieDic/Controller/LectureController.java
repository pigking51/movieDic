package dw.movieDic.Controller;


import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Lectures;
import dw.movieDic.Repository.LectureRepository;
import dw.movieDic.Service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500/")
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

    @GetMapping("/getalllectures/{id}")
    public ResponseEntity<Lectures> getLectureById(@PathVariable long id) {
        return new ResponseEntity<>(lectureService.getLectureById(id),
                HttpStatus.OK);
    }

    @PutMapping("/getalllectures/{id}")
    public ResponseEntity<Lectures> updateLectureById(@PathVariable long id,
                                               @RequestBody Lectures lectures) {
        return new ResponseEntity<>(lectureService.updateLectureById(id, lectures),
                HttpStatus.OK);
    }


}
