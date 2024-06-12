package dw.movieDic.Service;

import dw.movieDic.Model.Post;
import dw.movieDic.Repository.PostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostService {

    @Autowired
    PostRepository postRepository;

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }
}
