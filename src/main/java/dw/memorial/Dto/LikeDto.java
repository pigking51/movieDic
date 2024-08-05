package dw.memorial.Dto;

import dw.memorial.Model.Like;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LikeDto {

    private long postId;
    private long commentId;
    private String userId;

    public LikeDto toLikeDtoFromLike(Like like){
        LikeDto likeDto = new LikeDto();
        likeDto.setPostId(getPostId());
        likeDto.setCommentId(getCommentId());
        likeDto.setUserId(getUserId());

        return likeDto;
    }
}
