package dw.movieDic.Service;

import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Model.Survey;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.SurveyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SurveyService {
    @Autowired
   private SurveyRepository surveyRepository;

    public String saveSurvey(SurveyDto surveyDto) {
        Optional<User> surveyOptional = surveyRepository.findByUserId(surveyDto.getUserId());
//         surveyOptional
//        if(surveyOptional.stream().map(a -> a.getUserId()) != null){
//            return "이미 설문조사를 마치셨습니다!!";
//        }
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
