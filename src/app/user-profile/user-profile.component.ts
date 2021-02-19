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
  constructor(public service: SharedService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.refreshProfile();
  }
  refreshProfile = (): void => {
    const userId = this.service.decodedToken.nameid;
    this.service.getProfile(userId).subscribe(result => {
      this.profile = result;
      // console.log(this.propertiesToRent);
    }, error => console.error(error));
  }
  openModal(content: any): void {
    this.modalService.open(content);
  }

  deleteProfile(): void {
    const deleteObserver = {
      next: (x: any) => {
        console.log('Profile Deleted'),
        this.service.logout();
        this.router.navigate(['/home']);
      },
      error: (err: any) => console.log(err)
    };
    this.service.deleteProfile(this.profile?.id ?? '').subscribe(deleteObserver);

  }
  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    const addPropertyObserver = {
      next: (x: any) => {
        this.router.navigate(['/user-profile']);
      },
      error: (err: any) => console.log(err)
    };
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
