import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public service: SharedService, public router: Router) { }

  ngOnInit(): void {
  }

  okClicked(): void {
    this.router.navigate(['/home']);
  }

}
