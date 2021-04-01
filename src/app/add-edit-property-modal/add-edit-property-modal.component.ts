import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyType, Property } from 'src/assets/property';

@Component({
  selector: 'app-add-edit-property-modal',
  templateUrl: './add-edit-property-modal.component.html',
  styleUrls: ['./add-edit-property-modal.component.scss']
})
export class AddEditPropertyModalComponent implements OnInit {
  public types: any[] = Object.keys(PropertyType);
  @Input() rendterId = '';
  @Input() property: Property | undefined;
  @Input() actionType = 'edit';
  @Input() modalTitle: string | undefined;
  @Input() message: string | undefined;
  @Input() btnOkText: string | undefined;
  @Input() btnCancelText: string | undefined;

  constructor(private activeModal: NgbActiveModal, private service: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    const addPropertyObserver = {
      next: (x: any) => {
        this.router.navigate(['renter-home']);
      },
      error: (err: any) => console.log(err)
    };

    if (this.actionType.toLowerCase() === 'add')
    {
      this.service.addRenterProperty(this.rendterId, f.value).subscribe(addPropertyObserver);
    }

    else if (this.actionType.toLowerCase() === 'edit')
    {
      this.service.editRenterProperty(this.property?.id, f.value).subscribe(addPropertyObserver);
    }
    else
    {
      console.log(f.value, this.property?.id, this.property?.address?.id);
    }
  }

  public decline(): void {
    this.activeModal.close(false);
  }

  public accept(): void {
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.dismiss('user dismissed');
  }

  public close(): void {
    this.activeModal.dismiss('Cross button clicked');
  }
}
