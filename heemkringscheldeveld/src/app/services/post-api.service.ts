import { Injectable } from '@angular/core';
import { Post } from '../models/scully-models/content-models/post.model';
import { Entry } from '../models/scully-models/entry.model';
import { PageResult } from '../models/scully-models/page-result.model';
import { ContentfulApiService } from './contentful-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  constructor(private contentfullApi: ContentfulApiService) { }

  public getAll() {
    return this.contentfullApi.getEntriesByContentType<PageResult<Entry<Post>>>('post');
  }
}
