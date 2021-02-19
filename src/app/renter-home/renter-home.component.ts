import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-renter-home',
  templateUrl: './renter-home.component.html',
  styleUrls: ['./renter-home.component.scss']
})
export class RenterHomeComponent implements OnInit {
  public types = ['Apertment', 'Condo', 'Townhouse', 'House'];
  private userId = '';
  public renter: any;
  public properties: any = [];
  constructor(public service: SharedService, private modalService: NgbModal, public router: Router) {
    this.userId = this.service.decodedToken.nameid;
  }

  ngOnInit(): void {
    this.refreshPropertyList();
  }

  refreshPropertyList = (): void => {
    const renterObserver = {
      next: (x: any) => {
        console.log(x);
        this.renter = x;
        this.properties = x?.properties;
      },
      error: (err: any) => console.log(err)
    };

    this.service.getRenter(this.userId).subscribe(renterObserver);

  }
  openModal(content: any): void {
    this.modalService.open(content);
  }

  removeProperty(propertyId: string): void {
    const removePropertyObserver = {
      next: (x: any) => {
        console.log('Profile Deleted'),
        this.service.logout();
        this.router.navigate(['/renter-home']);
      },
      error: (err: any) => console.log(err)
    };
    this.service.removeRenterProperty(this.renter.id, propertyId).subscribe(removePropertyObserver);
  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    const addPropertyObserver = {
      next: (x: any) => {
        this.router.navigate(['renter-home']);
      },
      error: (err: any) => console.log(err)
    };

    this.service.addRenterProperty(this.renter?.id, f.value).subscribe(addPropertyObserver);
  }

}
