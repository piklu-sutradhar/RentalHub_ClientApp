import { ModalService } from './../modal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profile: Profile | undefined;
  constructor(public service: SharedService, public modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
    if (!this.service.loggedIn()){
      this.router.navigate(['home']);
    }
    else{
      this.refreshProfile();
    }
  }
  refreshProfile = (): void => {
    const userId = this.service.decodedToken.nameid;
    this.service.getProfile(userId).subscribe(result => {
      this.profile = result;
      // console.log(this.propertiesToRent);
    }, error => console.error(error));
  }


  deleteProfile(): void {
    this.modalService.confirm('Please confirm..', 'Are you sure to delete your profile?')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      const deleteObserver = {
        next: (x: any) => {
          console.log('Profile Deleted'),
          this.service.logout();
          this.router.navigate(['/home']);
        },
        error: (err: any) => console.log(err)
      };
      if (confirmed)
      {
        this.service.deleteProfile(this.profile?.id ?? '').subscribe(deleteObserver);
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }
  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    const addPropertyObserver = {
      next: (x: any) => {
        this.router.navigate(['/user-profile']);
        this.refreshProfile();
      },
      error: (err: any) => console.log(err)
    };

    this.service.editprofile(this.profile?.id ?? '', f.value).subscribe(addPropertyObserver);
  }

}

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  imageUrl: string;
}
