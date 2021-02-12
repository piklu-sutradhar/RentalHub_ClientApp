import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profile: any;
  constructor(public service: SharedService) { }

  ngOnInit(): void {
    this.refreshProfile();
  }
  refreshProfile = (): void => {
    const userId = localStorage.getItem('userId');
    this.service.getProfile(userId).subscribe(result => {
      this.profile = result;
      // console.log(this.propertiesToRent);
    }, error => console.error(error));
  }

}

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  user: object;
  adress: object;
}
