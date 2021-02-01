import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public propertiesToRent: Property[] = [];
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshPropertyList();
  }

  refreshPropertyList = (): void => {
    this.service.getPropertyList().subscribe(result => {
      this.propertiesToRent = result;
      console.log(this.propertiesToRent);
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
