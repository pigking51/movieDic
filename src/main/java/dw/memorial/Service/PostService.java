package dw.memorial.Service;

import dw.memorial.Dto.PostDto;
import dw.memorial.Exception.ResourceNotFoundException;
import dw.memorial.Model.Board;
import dw.memorial.Model.Post;
import dw.memorial.Model.User;
import dw.memorial.Repository.BoardRepository;
import dw.memorial.Repository.PostRepository;
import dw.memorial.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public PostDto updatePost(long postId, PostDto postDto){

        Optional<Post> post1 = postRepository.findById(postId);
        if(post1.isPresent()){
            post1.get().setPostTitle(postDto.getPostTitle());
            post1.get().setPostContent(postDto.getPostContent());
            post1.get().setCreatedAt(LocalDateTime.now());

            Post updatedPost = postRepository.save(post1.get());
            return postDto.toPostDtoFromPost(updatedPost);
        }else{
            throw new ResourceNotFoundException("Post", "ID", postId);
        }

    }

    public PostDto deletePost(long postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
        postRepository.delete(post);

        PostDto postDto = new PostDto();

        return postDto.toPostDtoFromPost(post);
    }


}
