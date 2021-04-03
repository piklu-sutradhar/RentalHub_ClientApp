import { ModalService } from './../modal.service';
import { Property } from './../../assets/property';
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
  panelOpenState = false;
  public types = ['Apertment', 'Condo', 'Townhouse', 'House'];
  private userId = '';
  public renter: any;
  public properties: Property[] = [];
  public propertytoEdit: Property | undefined;
  constructor(public service: SharedService, private modalService: ModalService, public router: Router) {
    this.userId = this.service.decodedToken?.nameid;
    if (this.service.loggedIn() && this.service.isRenter())
    {
      this.refreshPropertyList();
    }
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
  openModal(actionType: string, propertyId: string = ''): void {

    this.propertytoEdit = this.properties?.filter((p: { id: string; }) => p?.id === propertyId)[0];
    let title: string;
    if (actionType.toLowerCase() === 'add')
    {
      title = 'Add a new property';
    }
    else if (actionType.toLowerCase() === 'edit')
    {
      title = 'Edit this property';
    }
    else{
      title = '';
    }

    this.modalService.addOrEditpropertyModal(title, this.renter?.id, this.propertytoEdit, actionType)
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      const addPropertyObserver = {
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
        // this.service.removeRenterProperty(this.renter.id, propertyId).subscribe(removePropertyObserver);
        console.log('confirmed');
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  /*openEditModal(content: any, propertyId: string): void {
    this.propertytoEdit = this.properties.filter((p: { id: string; }) => p?.id === propertyId)[0];
    this.modalService.open(content);
  }*/

  editProperty(propertyId: string): void {
    console.log('Edit works');
  }
  removeProperty(propertyId: string): void {

    this.modalService.confirm('Please confirm..', 'Do you really want to remove this property?')
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
