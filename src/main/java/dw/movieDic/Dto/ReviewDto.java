package dw.movieDic.Dto;

import dw.movieDic.Model.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewDto {
    private Long LectureId;
    private String LectureName;
    private String userId;
    private int reviewRating;
    private String reviewText;

    // Review 엔티티를 Review 타입으로 형변환하는 메서드
    // 이런식의 형변환 코드를 내장하는 것이 더 효율적
    public ReviewDto toReviewDtoFromReview(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewRating(review.getRating());
        reviewDto.setReviewText(review.getReviewText());
        reviewDto.setLectureId(review.getLecture().getLectureId());
        reviewDto.setLectureName(review.getLecture().getLectureTitle());
        reviewDto.setUserId(review.getUser().getUserId());
        return reviewDto;
    }
}
