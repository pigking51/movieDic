package dw.memorial.Dto;

import dw.memorial.Model.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {
    private long commentId;
    private long boardId;
    private long postId;
    private String userId;
    private String commentContent;

    public CommentDto toCommentDtoFromComment(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setCommentId(getCommentId());
        commentDto.setBoardId(getBoardId());
        commentDto.setPostId(getPostId());
        commentDto.setUserId(getUserId());
        commentDto.setCommentContent(getCommentContent());
        return commentDto;
    }
}