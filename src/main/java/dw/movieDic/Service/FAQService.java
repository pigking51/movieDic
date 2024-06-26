package dw.movieDic.Service;

import dw.movieDic.Model.FAQ;
import dw.movieDic.Repository.FAQRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FAQService {
    @Autowired
    FAQRepository faqRepository;

    public List<FAQ> getAllFAQ(){
        return faqRepository.findAll();
    }
}
