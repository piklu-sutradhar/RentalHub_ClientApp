import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    console.log(f.value);
    console.log(f.valid);
    const loginObserver = {
      next: (x: any) => {
        console.log('Logged in successfully'),
        this.router.navigate(['/home']);
      },
      error: (err: any) => console.log(err),
      complete: () => {}
    };
    this.service.login(f.value).subscribe(loginObserver);
  }

}
