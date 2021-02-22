import { Router } from '@angular/router';
import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public propertiesToRent: Property[] = [];
  constructor(public service: SharedService, public router: Router) { }

  ngOnInit(): void {
    if (this.service.isRenter())
    {
      this.router.navigate(['/renter-home']);
    }
    else if(this.service.loggedIn())
    {
      this.refreshPropertyList();
    }
    // this.service.getPropertyList().subscribe(result => {
    //   this.propertiesToRent = result.filter(property => property.available === true);
    //   // console.log(this.propertiesToRent);
    // }, error => console.error(error));
  }

  refreshPropertyList = (): void => {
    const role = this.service.role;
    this.service.getPropertyList().subscribe(result => {
      this.propertiesToRent = result.filter(property => property.available === true);
      // console.log(this.propertiesToRent);
    }, error => console.error(error));
  }
}

interface Property {
  id: number;
  title: string;
  renteeId: number;
  currentRentee: object;
  renterId: number;
  renter: object;
  type: number;
  bedRooms: number;
  baths: number;
  addressId: number;
  propertyAddress: object;
  available: boolean;
}
