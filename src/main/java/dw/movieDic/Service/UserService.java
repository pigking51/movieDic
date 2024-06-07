package dw.movieDic.Service;

import dw.movieDic.Dto.UserDto;
import dw.movieDic.Model.Authority;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public List<User> GetAllUsers(){return userRepository.findAll();}

    public String saveUser(UserDto userDto){
        Optional<User> userOptional = userRepository.findByUserId(userDto.getUserId());
        if(userOptional.isPresent()){
            return "이미 등록된 아이디입니다.";
        }
        Authority authority = new Authority();
        authority.setAuthorityName("ROLE_USER");
        User user = new User(userDto.getUserId(),
                userDto.getUserName(),
                userDto.getUserEmail(),
                bCryptPasswordEncoder.encode(userDto.getPassword()),
                authority,
                userDto.getGender(),
                userDto.getAge(),
                userDto.getBirthday(),
                LocalDateTime.now());
        // 위에꺼 설정할때 table과의 순서 맞는지 확인!!
        // → 안하면 lombok에서 인식할때 오류생김
        return userRepository.save(user).getUserId();
    }
}
