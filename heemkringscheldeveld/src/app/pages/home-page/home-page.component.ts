import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/scully-models/content-models/post.model';
import { Entry } from 'src/app/models/scully-models/entry.model';
import { PostApiService } from 'src/app/services/post-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public postEntries: Entry<Post>[];
  
  constructor(private postApi: PostApiService) { }

  ngOnInit() {
    this.postApi.getAll().subscribe(x => this.postEntries = x.items.slice(0, 3));
  }
}
