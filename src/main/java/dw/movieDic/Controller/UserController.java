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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
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
        return new ResponseEntity<>(userService.getAllUsers(),
                HttpStatus.OK);
    }

    @PostMapping("signup")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto){
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
        HttpSession session = request.getSession(true); // true: 세션이 없으면 새로 생성
        // 세션에 인증 객체 저장
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext());

        return ResponseEntity.ok("Success");
    }

    @PostMapping("logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return "You have been logged out!!";
    }

    @PatchMapping("/modify/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id,
            @RequestBody User user){
        return new ResponseEntity<>(userService.updateUser(id, user),
                HttpStatus.OK);
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

    // 대시보드 사용자 관리를 위한 유저 정보 불러오기
    @GetMapping("getallusersparts")
    public ResponseEntity<List<Object[]>> getAllUsersParts(){
        return new ResponseEntity<>(userService.getAllUsersParts(),
                HttpStatus.OK);
    }
//    @GetMapping("/currentname")
//    public ResponseEntity<Object[]> getUserPartsRealName(){
//        return new ResponseEntity<>(userService.getUserCurrentRealName(),
//                HttpStatus.OK);
//    }


}
