package dw.movieDic.Service;

import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Lectures;
import dw.movieDic.Repository.LectureRepository;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class LectureService {
    @Autowired
    LectureRepository lectureRepository;
    UserRepository userRepository;

    public LectureService(LectureRepository lectureRepository, UserRepository userRepository) {
        this.lectureRepository = lectureRepository;
        this.userRepository = userRepository;
    }

    public List<Lectures> getAllLectures() {
        return lectureRepository.findAll();
    }
//
//    public Lectures getLectureById(long id) {
//        Optional<Lectures> LectureOptional = lectureRepository.findById(id);
//        if(LectureOptional.isPresent()) {
//            return LectureOptional.get();
//        }else {
//            throw new ResourceNotFoundException("Lecture", "ID", id);
//        }
//    }

//    public Lectures updateLectureById(long id, Lectures lecture) {
//        Optional<Lectures> LectureOptional = LectureRepository.findById(id);
//        if(LectureOptional.isPresent()) {
//            Lectures temp = LectureOptional.get();
//            temp.setLectureTitle(lecture.getLectureTitle());
//            temp.setUserId(lecture.getUserId());
//            temp.setPrice(lecture.getPrice());
//            temp.setImage(lecture.getImage());
//            temp.setLectureExplanation(lecture.getLectureExplanation());
//            lectureRepository.save(temp);
//            return temp;
//        }else {
//            throw new ResourceNotFoundException("Lecture", "ID", id);
//        }
//    }


}
