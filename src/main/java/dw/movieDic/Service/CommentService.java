package dw.movieDic.Service;

import dw.movieDic.Dto.CommentDto;
import dw.movieDic.Dto.PostDto;
import dw.movieDic.Exception.ResourceNotFoundException;
import dw.movieDic.Model.Board;
import dw.movieDic.Model.Comment;
import dw.movieDic.Model.Post;
import dw.movieDic.Model.User;
import dw.movieDic.Repository.BoardRepository;
import dw.movieDic.Repository.CommentRepository;
import dw.movieDic.Repository.PostRepository;
import dw.movieDic.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    public CommentDto saveComment(CommentDto commentDto) {
        Board board = boardRepository.findById(commentDto.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));
        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        User user = userRepository.findById(commentDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Comment comment = new Comment();
        comment.setBoard(board);
        comment.setPost(post);
        comment.setUser(user);
        comment.setCommentContent(commentDto.getCommentContent());

        Comment savedComment = commentRepository.save(comment);

        return commentDto.toCommentDtoFromComment(savedComment);
    }

    public List<Comment> showAllComments(){
        return commentRepository.findAll();
    }

    public CommentDto updateComment2(long commentId, CommentDto commentDto){

        User user = userRepository.findById(commentDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        List<Comment> comment1 = commentRepository.findAll();
        for(int i = 0; i < comment1.size(); i++){
            if(Objects.equals(comment1.get(i).getUser().getUserId(), user.getUserId())&&
                    Objects.equals(comment1.get(i).getCommentId(), commentId)){
                comment1.get(i).setCommentContent(commentDto.getCommentContent());
                comment1.get(i).setUser(user);

                Comment savedComment = commentRepository.save(comment1.get(i));

                return commentDto.toCommentDtoFromComment(savedComment);
            }

        }
        return commentDto;
    }

    public CommentDto updateComment(long commentId, CommentDto commentDto) {

        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        Optional<Comment> comment1 = commentRepository.findById(commentId);
        if(comment1.isPresent()){
        comment1.get().setCommentContent(commentDto.getCommentContent());
        comment1.get().setCreatedAt(LocalDateTime.now());
        comment1.get().setPost(post);

        Comment updatedComment = commentRepository.save(comment1.get());

            return commentDto.toCommentDtoFromComment(updatedComment);
        }
        else{
            throw new ResourceNotFoundException("Comment", "ID", commentId);
        }

    }

    public CommentDto deleteComment(long commentId){

        Comment comment = commentRepository.findById(commentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Comment", "CommentId", commentId));

        commentRepository.delete(comment);

        CommentDto commentDto = new CommentDto();

        return commentDto.toCommentDtoFromComment(comment);
    }

}
