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

    public Lectures getLectureById(long id) {
        Optional<Lectures> lecturesOptional = lectureRepository.findById(id);
        if(lecturesOptional.isPresent()) {
            return lecturesOptional.get();
        }else {
            throw new ResourceNotFoundException("Lecture", "ID", id);
        }
    }

    public Lectures updateLectureById(long id, Lectures lectures) {
        Optional<Lectures> lecturesOptional = lectureRepository.findById(id);
        if(lecturesOptional.isPresent()) {
            Lectures temp = lecturesOptional.get();
            temp.setLectureTitle(lectures.getLectureTitle());
            temp.setMajor(lectures.getMajor());
            temp.setPrice(lectures.getPrice());
            temp.setImage(lectures.getImage());
            temp.setText(lectures.getText());
            temp.setLectureUrl(lectures.getLectureUrl());
            lectureRepository.save(temp);
            return temp;
        }else {
            throw new ResourceNotFoundException("lecture", "ID", id);
        }
    }





}
