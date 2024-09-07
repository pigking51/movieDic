package dw.movieDic.Dto;

import dw.movieDic.Model.Survey;
import dw.movieDic.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SurveyDto {
    private Long surveyId;
    private int answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String answer5;
    private String userId;

    public SurveyDto toSurveyDtoFromSurvey(Survey survey){
        SurveyDto surveyDto = new SurveyDto();
        surveyDto.setSurveyId(survey.getSurveyId());
        surveyDto.setAnswer1(survey.getAnswer1());
        surveyDto.setAnswer2(survey.getAnswer2());
        surveyDto.setAnswer3(survey.getAnswer3());
        surveyDto.setAnswer4(survey.getAnswer4());
        surveyDto.setAnswer5(survey.getAnswer5());
        surveyDto.setUserId(survey.getUserId().getUserId());
        return surveyDto;
    }

}


