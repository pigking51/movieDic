package dw.movieDic.Service;

import dw.movieDic.Dto.CommentDto;
import dw.movieDic.Dto.PostDto;
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
}
