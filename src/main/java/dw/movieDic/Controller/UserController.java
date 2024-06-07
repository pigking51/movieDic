package dw.movieDic.Controller;

import dw.movieDic.Dto.SessionDto;
import dw.movieDic.Dto.UserDto;
import dw.movieDic.Model.User;
import dw.movieDic.Service.UserDetailService;
import dw.movieDic.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/user", method= RequestMethod.GET)
public class UserController {
    private UserService userService;
    private UserDetailService userDetailService;
    private AuthenticationManager authenticationManager;
    private HttpServletRequest httpServletRequest;

    public UserController(UserService userService, UserDetailService userDetailService, AuthenticationManager authenticationManager, HttpServletRequest httpServletRequest) {
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.authenticationManager = authenticationManager;
        this.httpServletRequest = httpServletRequest;
    }
    @GetMapping("show")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userService.GetAllUsers(),
                HttpStatus.OK);
    }

    @PostMapping("signup")
    public ResponseEntity<String> signUp(@RequestBody UserDto userDto){
        return new ResponseEntity<>(userService.saveUser(userDto),
                HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto,
                                        HttpServletRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUserId(), userDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 세션 생성
        HttpSession session = request.getSession(true);
        // 세션에 인증 객체 저장
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext());

        return ResponseEntity.ok("Success");
    }
    @PostMapping("/logout")
    private String logout(HttpServletRequest request,
                          HttpServletResponse response){
        // response는 status 200을 보내주는 주체를 의미
        // request는 클라이언트에서 요청한 내용 원본이 들어있음
        HttpSession session = request.getSession(false);
        // 없으면 null값 요청하는 것
        if(session != null){
            session.invalidate();
        }
        return "You have been logged out!";
        
    }

    @GetMapping("current")
    public SessionDto getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()){
            throw new IllegalStateException("User is not authenticated");
        }
        SessionDto sessionDto = new SessionDto();
        sessionDto.setUserId(authentication.getName());
        sessionDto.setAuthority(authentication.getAuthorities());
        return sessionDto;
    }
}
