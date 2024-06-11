package dw.movieDic.Controller;

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
    @GetMapping("/movieDic/index.html")
    public String index(){
        return "index";
    }
    @GetMapping("/movieDic/signup.html")
    public String signup(){
        return "signup";
    }
    @GetMapping("/movieDic/survey.html")
    public String survey(){
        return "survey";
    }
    @GetMapping("/movieDic/board.html")
    public String board(){
        return "board";
    }
    @GetMapping("/movieDic/singleProduct.html")
    public String singleProduct(){
        return "singleProduct";
    }
    @GetMapping("/movieDic/login.html")
    public String login(){
        return "login";
    }
    @GetMapping("/movieDic/cart.html")
    public String cart(){
        return "cart";
    }
    @GetMapping("/movieDic/myPage.html")
    public String myPage(){
        return "myPage";
    }
}
