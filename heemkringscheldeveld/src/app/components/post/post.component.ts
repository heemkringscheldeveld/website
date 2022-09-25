import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/scully-models/content-models/post.model';
import { Entry } from 'src/app/models/scully-models/entry.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() postEntry: Entry<Post>;

  constructor() { }

  ngOnInit(): void {
  }

}
