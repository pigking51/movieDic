package dw.memorial.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/login")
    public String login_form(){
        return "login_form";
    }
    @GetMapping("/articles")
    public String articles(){
        return "articles";
    }
    @GetMapping("/memorial/index.html")
    public String index(){
        return "index";
    }
    @GetMapping("/memorial/signup.html")
    public String signup(){
        return "signup";
    }
    @GetMapping("/memorial/survey.html")
    public String survey(){
        return "survey";
    }
    @GetMapping("/memorial/board.html")
    public String board(){
        return "board";
    }
    @GetMapping("/memorial/postDetail.html")
    public String postDetail(){
        return "postDetail";
    }
    @GetMapping("/memorial/write.html")
    public String write(){
        return "write";
    }
    @GetMapping("/memorial/singleProduct.html")
    public String singleProduct(){
        return "singleProduct";
    }
    @GetMapping("/memorial/login.html")
    public String login(){
        return "login";
    }
    @GetMapping("/memorial/mainpage.html")
    public String mainPage(){
        return "mainPage";
    }
    @GetMapping("/memorial/team.html")
    public String team(){
        return "team";
    }
    @GetMapping("/memorial/lecture.html")
    public String                lecture(){
        return "lecture";
    }
    @GetMapping("/memorial/lectureDetail.html")
    public String lectureDetail(){
        return "lectureDetail";
    }
    @GetMapping("/memorial/cart.html")
    public String cart(){
        return "cart";
    }
    @GetMapping("/memorial/myPage.html")
    public String myPage(){
        return "myPage";
    }
    @GetMapping("/memorial/FAQ.html")
    public String FAQ(){
        return "FAQ";
    }
    @GetMapping("/memorial/streaming.html")
    public String streaming(){
        return "streaming";
    }
    @GetMapping("/memorial/event.html")
    public String event(){
        return "event";
    }
    @GetMapping("/memorial/dashboard.html")
    public String dashboard(){
        return "dashboard";
    }
}
