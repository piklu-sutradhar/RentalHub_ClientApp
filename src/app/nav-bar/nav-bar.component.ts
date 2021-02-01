import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  collapse = (): void =>  {
    this.isExpanded = false;
  }

  toggle = (): void =>  {
    this.isExpanded = !this.isExpanded;
  }

}
