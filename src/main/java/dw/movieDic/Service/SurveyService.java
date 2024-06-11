package dw.movieDic.Service;

import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Model.Survey;
import dw.movieDic.Repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class SurveyService {
    @Autowired
   private SurveyRepository surveyRepository;

    public String saveSurvey(SurveyDto surveyDto) {
        Optional<Survey> surveyOptional = surveyRepository.findByUserId(surveyDto.getUserId().getUserId());
        if(surveyOptional.isPresent()){
            return "이미 설문조사를 마치셨습니다!!";
        }
        Survey survey = new Survey(surveyDto.getSurveyId(),
                surveyDto.getSurveyQuestion(),
                surveyDto.getAnswer(),
                surveyDto.getUserId());
        return surveyRepository.save(survey).getUserId().getUserId();
    }

    }
