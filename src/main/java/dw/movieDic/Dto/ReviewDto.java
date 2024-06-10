package dw.movieDic.Dto;

import dw.movieDic.Model.LectureReview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewDto {
    private Long postId;
    private String postName;
    private String userId;
    private int reviewPoint;
    private String reviewText;

    // Review의 엔티티를 Review 타입으로 형변환하는 메서드
    // 이런식의 형변환 코드를 내장하는 것이 더 효율적

    public ReviewDto toReviewDtoFromReview(LectureReview review){
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewPoint(review.getPoint());
        reviewDto.setReviewText(review.getReviewText());
        reviewDto.setPostId(review.getLectures().getLectureId());
        reviewDto.setPostName(review.getLectures().getLectureTitle());
        reviewDto.setUserId(String.valueOf(review.getLectures().getUserId()));
        // ↑ 해당 코드 원본이랑 다르게 변형함
        return reviewDto;
    }

}
