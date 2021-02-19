import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isExpanded = false;

  constructor(public service: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  collapse = (): void =>  {
    this.isExpanded = false;
  }

  toggle = (): void =>  {
    this.isExpanded = !this.isExpanded;
  }

  logout = (): void => {
    this.service.logout();
  }

}
