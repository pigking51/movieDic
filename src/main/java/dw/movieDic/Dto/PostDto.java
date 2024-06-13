package dw.movieDic.Dto;

//import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonGenerator;
import dw.movieDic.Model.Post;
import dw.movieDic.Model.Survey;
import lombok.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonParser;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {
    private long boardId;
    private String userId;
    private String postTitle;
    private String postContent;

    public PostDto toPostDtoFromPost(Post post) {
        PostDto postDto = new PostDto();
        postDto.setBoardId(getBoardId());
        postDto.setUserId(getUserId());
        postDto.setPostTitle(getPostTitle());
        postDto.setPostContent(getPostContent());
        return postDto;
    }

//    ObjectMapper mapper = new ObjectMapper();
//    mapper.enable(JsonGenerator.Feature.STRICT_DUPLICATE_DETECTION)
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_COMMENTS);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_SINGLE_QUOTES);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_NON_NUMERIC_NUMBERS);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_NUMERIC_LEADING_ZEROS);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_SINGLE_QUOTES);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_COMMENTS);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_BACKSLASH_ESCAPING_ANY_CHARACTER);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_NUMERIC_LEADING_ZEROS);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_MISSING_VALUES);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.ALLOW_TRAILING_COMMA);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.STRICT_DUPLICATE_DETECTION);
//mapper.getFactory().setParserFeatures(JsonParser.Feature.IGNORE_UNDEFINED);
}
