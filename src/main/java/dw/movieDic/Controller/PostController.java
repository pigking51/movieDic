package dw.movieDic.Controller;


import dw.movieDic.Dto.PostDto;
import dw.movieDic.Model.Post;
import dw.movieDic.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;
    @GetMapping("/getallposts")
    public ResponseEntity<List<Post>> getAllPosts(){
        return new ResponseEntity<>(postService.getAllPosts(),
                HttpStatus.OK);
    }

    @GetMapping("/getallpostsarrays")
    public ResponseEntity<List<Post>> getAllPostsArrays(){
        return new ResponseEntity<>(postService.getAllPostsArrays(),
                HttpStatus.OK);
    }

    @GetMapping("/getallpostsparts")
    public ResponseEntity<List<Object[]>> getAllPostsParts(){
        return new ResponseEntity<>(postService.getAllPostsParts(),
                HttpStatus.OK);
    }
    @GetMapping("/getallpostsparts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable long id){
        return new ResponseEntity<>(postService.getPostById(id),
                HttpStatus.OK);
    }



    @PostMapping("/write")
    public ResponseEntity<PostDto> savePost(@RequestBody PostDto postDto) {
        PostDto savedPostDto = postService.savePost(postDto);
        return new ResponseEntity<>(savedPostDto, HttpStatus.OK);
    }
}
