import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    const registerObserver = {
      next: (x: any) => {
        console.log('user created');
        this.router.navigate(['/login']);
      },
      error: (err: any) => console.log(err)
    };
    this.service.register(f.value).subscribe(registerObserver);
  }

}
