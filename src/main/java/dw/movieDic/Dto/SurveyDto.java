package dw.movieDic.Dto;

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
    private String surveyQuestion;
    private int answer;
    private User userId;
}
