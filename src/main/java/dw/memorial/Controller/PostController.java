package dw.memorial.Controller;


import dw.memorial.Dto.PostDto;
import dw.memorial.Model.Post;
import dw.memorial.Service.PostService;
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

    @PatchMapping("/rewrite/{postId}")
    public ResponseEntity<PostDto> updatePost(@PathVariable long postId,
                                                  @RequestBody PostDto postDto){
        return new ResponseEntity<>(postService.updatePost(postId, postDto),
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<PostDto> deletePost(@PathVariable long postId){
        return new ResponseEntity<>(postService.deletePost(postId),
                HttpStatus.OK);
    }
}
