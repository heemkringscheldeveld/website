import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  @Input() public drawer: any;
  @Input() public disabled: boolean = false;

  ngOnInit(): void {
  }

}
