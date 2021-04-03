import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Property, PropertyType } from 'src/assets/property';
import { AddEditPropertyModalComponent } from './add-edit-property-modal/add-edit-property-modal.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openModal(content: any): void {
    this.modalService.open(content);
  }
  public addOrEditpropertyModal(
    modalTitle: string,
    renterId: string,
    property: Property,
    actionType: string = 'Add',
    btnOkText: string = actionType + ' Property',
  ): Promise<boolean> {
    const modalRef = this.modalService.open(AddEditPropertyModalComponent);
    if (property === undefined)
    {
      property = {
        title: '',
        id: '',
        propertyType: PropertyType.Apertment,
        bedRooms: 1,
        baths: 1,
        available: true,
        address: {
          id : '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          province: '',
          country: '',
          postalCode: '',
      }

      };
    }
    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.renterId = renterId;
    modalRef.componentInstance.property = property;
    modalRef.componentInstance.btnOkText = btnOkText;

    return modalRef.result;
  }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
