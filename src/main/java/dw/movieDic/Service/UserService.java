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

    public List<User> getAllUsers(){return userRepository.findAll();}

    public String saveUser(UserDto userDto){
        Optional<User> userOptional = userRepository.findByUserId(userDto.getUserId());
        if(userOptional.isPresent()){
            return "이미 등록된 아이디입니다.";
        }
        Authority authority = new Authority();
        authority.setAuthorityName("ROLE_USER");
        User user = new User(userDto.getUserId(),
                bCryptPasswordEncoder.encode(userDto.getPassword()),
                userDto.getBirthday(),
                userDto.getUserEmail(),
                LocalDateTime.now(),
                userDto.getUserName(),
                authority,
                userDto.getGender());
        return userRepository.save(user).getUserId();

    }
}
