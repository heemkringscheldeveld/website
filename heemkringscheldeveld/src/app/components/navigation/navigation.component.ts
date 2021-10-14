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
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
      window.scrollY != 0
        ? nav.classList.add('background')
        : nav.classList.remove('background');
    })
  }
}
