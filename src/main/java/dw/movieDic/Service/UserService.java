package dw.movieDic.Service;

import dw.movieDic.Dto.UserDto;
import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Authority;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
                userDto.getRealName(),
                authority,
                userDto.getGender());
        return userRepository.save(user).getUserId();

    }

    public User updateUser(String id, User user){
        Optional<User> userOptional = userRepository.findByUserId(id);
        if(userOptional.isPresent()){

            User temp = userOptional.get();
//            temp.setUserId(user.getUserId());
//            userId는 @ID로 설정했기때문에 이 방식으로 갱신 불가능함!!!
            temp.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            temp.setEmail(user.getEmail());
            temp.setRealName(user.getUsername());
            userRepository.save(temp);
            return temp;
        }else{
            throw new ResourceNotFoundException("User", "ID", id);
        }

    }

    // 대시보드에 사용자 관리를 위한 유저 정보 불러오기 비즈니스 로직
    public List<Object[]> getAllUsersParts(){
        return userRepository.getUserInfo();
    }

//    public Object[] getUserCurrentRealName(){
//        return userRepository.findAll().stream().map((user) -> user.getUsername()).collect(Collectors.toList()).toArray();
////        if(userOptional.isEmpty()){
////            return "there is no data";
////        }
////           return userOptional.get().getUsername();
//    }

}
