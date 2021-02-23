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
  public properties: any[] = [];
  public propertytoEdit: any;
  constructor(public service: SharedService, private modalService: NgbModal, public router: Router) {
    this.userId = this.service.decodedToken?.nameid;
  }

  ngOnInit(): void {
    if (!this.service.loggedIn()){
      this.router.navigate(['home']);
    }
    else{
      this.refreshPropertyList();
    }
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

  openEditModal(content: any, propertyId: string): void {
    this.propertytoEdit = this.properties.filter((p: { Id: string; }) => p?.Id === propertyId);
    this.modalService.open(content);
  }

  removeProperty(propertyId: string): void {

    this.service.confirm('Please confirm..', 'Do you really want to remove this property?')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      const removePropertyObserver = {
        next: () => {
          // const propertyIndex = this.properties.findIndex(p => p.id === propertyId);
          // this.properties.splice(propertyIndex, 1);
          this.router.navigate(['/renter-home']);
          this.refreshPropertyList();
        },
        error: (err: any) => console.log(err)
      };
      if (confirmed)
      {
        this.service.removeRenterProperty(this.renter.id, propertyId).subscribe(removePropertyObserver);
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    const addPropertyObserver = {
      next: (x: any) => {

        this.refreshPropertyList();
        this.router.navigate(['renter-home']);
      },
      error: (err: any) => console.log(err)
    };

    this.service.addRenterProperty(this.renter?.id, f.value).subscribe(addPropertyObserver);
  }

}
