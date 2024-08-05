package dw.memorial.Service;

import dw.memorial.Model.FAQ;
import dw.memorial.Repository.FAQRepository;
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
