import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, URLSearchParams } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine';
import { IPost } from '../models/Post';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PostService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }

  getPosts() {
    return this.http.get<IPost[]>(`${this.baseUrl}/api/posts`);
  }

  getPost(post: IPost) {
    return this.http.get<IPost>(`${this.baseUrl}/api/posts/` + post.id);
  }

  deletePost(post: IPost) {
    return this.http.delete<IPost>(`${this.baseUrl}/api/posts/` + post.id);
  }

  updatePost(post: IPost){
    return this.http.put<IPost>(`${this.baseUrl}/api/posts/` + post.id, post);
  }

  addPost(newPostName: string) {
    return this.http.post<IPost>(`${this.baseUrl}/api/posts`, { name: newPostName });
  }
}
