import {
  Component, OnInit,
  // animation imports
  trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { IPost } from '../../models/Post';
import { PostService } from '../../shared/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    // Animation example
    // Triggered in the ngFor with [@flyInOut]
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class PostsComponent implements OnInit {

  posts: IPost[];
  selectedPost: IPost;

  // Use "constructor"s only for dependency injection
  constructor(
    private postService: PostService
  ) { }

  // Here you want to handle anything with @Input()'s @Output()'s
  // Data retrieval / etc - this is when the Component is "ready" and wired up
  ngOnInit() {
    this.postService.getPosts().subscribe(result => {
      console.log('HttpClient [GET] /api/posts/allresult', result);
      this.posts = result;
    });
  }

  onSelect(post: IPost): void {
    this.selectedPost = post;
  }

  deletePost(post) {
    this.clearPost();
    this.postService.deletePost(post).subscribe(result => {
      console.log('Delete post result: ', result);
      let position = this.posts.indexOf(post);
      this.posts.splice(position, 1);
    }, error => {
      console.log(`There was an issue. ${error._body}.`);
    });
  }

  onPostUpdate(event) {
    this.clearPost();
  }

  addPost(newPostName) {
    this.clearPost();
    this.postService.addPost(newPostName).subscribe(result => {
      console.log('Post post result: ', result);
      this.posts.push(result);
    }, error => {
      console.log(`There was an issue. ${error._body}.`);
    });
  }

  clearPost() {
    if (this.selectedPost) {
      this.selectedPost = null;
    }
  }
}
