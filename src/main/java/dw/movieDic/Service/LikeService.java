package dw.movieDic.Service;

import dw.movieDic.Dto.LikeDto;
import dw.movieDic.Model.*;
import dw.movieDic.Repository.CommentRepository;
import dw.movieDic.Repository.LikeRepository;
import dw.movieDic.Repository.PostRepository;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LikeService {

    @Autowired
    LikeRepository likeRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;


    public LikeDto saveAddLike(LikeDto likeDto){

        Comment comment = commentRepository.findById(likeDto.getCommentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));
        Post post = postRepository.findById(likeDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        User user = userRepository.findById(likeDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Like like1= new Like();
        like1.setComment(comment);
        like1.setPost(post);
        like1.setUser(user);

        Like savedLike = likeRepository.save(like1);

        return likeDto.toLikeDtoFromLike(savedLike);
    }

    public List<Like> getAllLikes(){
        return likeRepository.findAll();
    }
}
