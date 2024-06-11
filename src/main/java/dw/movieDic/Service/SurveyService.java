package dw.movieDic.Service;

import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Model.Survey;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.SurveyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class SurveyService {
    @Autowired
   SurveyRepository surveyRepository;

    public Survey saveSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    public List<Survey> getSurveyAll(){
        return surveyRepository.findAll();
    }

    public List<SurveyDto> getSurveyAllByDto(){
        List<Survey> surveyList = surveyRepository.findAll();
        List<SurveyDto> surveyDtoList = new ArrayList<>();
        for(Survey survey : surveyList){
            SurveyDto surveyDto = new SurveyDto();
            surveyDtoList.add(surveyDto.toSurveyDtoFromSurvey(survey));
        }
    return surveyDtoList;
    }
    }
