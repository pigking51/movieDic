package dw.movieDic.Controller;

import dw.movieDic.Model.FAQ;
import dw.movieDic.Service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FAQController {
    @Autowired
    FAQService faqService;

    @GetMapping("/faq")
    public ResponseEntity<List<FAQ>> getAllFAQ(){
        return new ResponseEntity<>(faqService.getAllFAQ(),
                HttpStatus.OK);
    }
}
