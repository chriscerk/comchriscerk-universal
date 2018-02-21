import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../models/Post';
import { PostService } from '../../shared/post.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html'
})
export class PostDetailComponent {
    @Input() post: IPost;
    @Output() postUpdate: EventEmitter<any> = new EventEmitter();
    constructor(private postService: PostService) { }


    updatePost(post) {
        this.postService.updatePost(post).subscribe(result => {
            console.log('Put post result: ', result);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
          });
      this.postUpdate.emit(null);
    }
}
