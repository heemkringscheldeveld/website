import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent implements OnInit {
  @Input() public title: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
