package dw.movieDic.Service;

import dw.movieDic.Dto.PostDto;
import dw.movieDic.Dto.SurveyDto;
import dw.movieDic.Exception.ResourceNotFoundException;
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

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<Post> getAllPostsArrays(){
        List<Post> postsArrayList = postRepository.findAll().stream().toList();

        return postsArrayList;
    }
    public List<Object[]> getAllPostsParts(){
                return postRepository.getPostInfo();
    }

    public Post getPostById(long id){
        Optional<Post> postOptional = postRepository.findById(id);
        if(postOptional.isPresent()){
            return postOptional.get();
        }else{
            throw new ResourceNotFoundException("Post", "ID", id);
        }
    }
}
