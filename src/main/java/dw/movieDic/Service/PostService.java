package dw.movieDic.Service;

import dw.movieDic.Dto.PostDto;
import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Model.Board;
import dw.movieDic.Model.Post;
import dw.movieDic.Model.Survey;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.BoardRepository;
import dw.movieDic.Repository.PostRepository;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    public PostDto savePost(PostDto postDto) {
        Board board = boardRepository.findById(postDto.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));
        User user = userRepository.findById(postDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Post post = new Post();
        post.setBoard(board);
        post.setUser(user);
        post.setPostTitle(postDto.getPostTitle());
        post.setPostContent(postDto.getPostContent());

        Post savedPost = postRepository.save(post);

        return postDto.toPostDtoFromPost(savedPost);
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }
}
