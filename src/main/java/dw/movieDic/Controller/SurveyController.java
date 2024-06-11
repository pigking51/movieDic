package dw.movieDic.Controller;

import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/csat")
public class SurveyController {
    @Autowired
    private SurveyService surveyService;

    @PostMapping("/survey")
    public ResponseEntity<String> survey(@RequestBody SurveyDto surveyDto){
        return new ResponseEntity<>(surveyService.saveSurvey(surveyDto),
                HttpStatus.OK);
    }
}
