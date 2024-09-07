package dw.movieDic.Controller;

import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Model.Survey;
import dw.movieDic.Service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/csat")
public class SurveyController {
    @Autowired
    SurveyService surveyService;

    @PostMapping("/survey")
    public ResponseEntity<SurveyDto> saveSurvey(@RequestBody Survey survey){
        return new ResponseEntity<>(surveyService.saveSurvey(survey),
                HttpStatus.OK);
    }

    @GetMapping("/survey")
    public ResponseEntity<List<Survey>> getSurveyAll(){
        return new ResponseEntity<>(surveyService.getSurveyAll(),
                HttpStatus.OK);
    }

    @GetMapping("/survey/dto")
    public ResponseEntity<List<SurveyDto>> getSurveyAllByDto(){
        return new ResponseEntity<>(surveyService.getSurveyAllByDto(),
                HttpStatus.OK);
    }
}
