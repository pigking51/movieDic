package dw.movieDic.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/login")
    public String login_form() {
        return "login_form";
    }

    @GetMapping("/articles")
    public String article() {
        return "article";
    }

    @GetMapping("/moviedic/index.html")
    public String index2(){return "index";}

    @GetMapping("/moviedic/login.html")
    public String login2(){return "login";}

    @GetMapping("/moviedic/signup.html")
    public String signup(){return "signup";}

    @GetMapping("/moviedic/mypage.html")
    public String mypage2(){return "mypage";}

    @GetMapping("/moviedic/singleProduct.html")
    public String singleProduct(){return "singleProduct";}

    @GetMapping("/moviedic/cart.html")
    public String cart2(){return "cart";}
}
