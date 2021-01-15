import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';


import {ActivatedRoute, Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCom } from '../Service/userCom';


@Component({ templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userCom: UserCom
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    console.log(localStorage.getItem('jwt'));
    console.log(localStorage.getItem('jwt') !== undefined);
  }

// convenience getter for easy access to form fields//346947  286166
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userCom.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          localStorage.setItem('jwt', data);
          console.log(data);
        },
        error => {
          this.error = error;
          console.log(error);
          this.loading = false;
        });
  }
}
