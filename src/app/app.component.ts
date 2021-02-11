import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedService } from 'src/app/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  helper = new JwtHelperService();
  title = 'RentelHub-ClientApp';

  constructor(private service: SharedService) {

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token') ?? '';
    this.service.decodedToken = this.helper.decodeToken(token);
    this.service.userName = localStorage.getItem('currentUser');
  }
}
