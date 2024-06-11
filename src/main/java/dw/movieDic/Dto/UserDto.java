package dw.movieDic.Dto;

import dw.movieDic.Model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {
    private String userId;
    private String password;
    private String userName;
    private String userEmail;
    private User.GenderEnum gender;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;


}
