import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCom } from '../Service/userCom';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  userName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userCom: UserCom
    //private userService: UserService
  ) {

  }

  ngOnInit() {
    this.firstName = this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])),
      this.lastName = this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])),
      this.email = this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      this.userName = this.formBuilder.control('', Validators.required),
      this.password = this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(8)])),
      this.confirmPassword = this.formBuilder.control('', Validators.required)

    this.registerForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword

    });
  }

  //public onSubmit() {
  //TODO Finish this
  //}

  passwordConfirmation() {
    if (this.password == this.confirmPassword) {
      return true;
    }
    else {
      return false;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm, 'Error in onSubmit()');
      return;
    }
    this.isLoading = true;
    this.userCom.register(this.registerForm.value).pipe().subscribe(() =>{
      this.router.navigate(['/']);
    },
    error => {
      console.log('Error while registering:', error);
      this.isLoading = false;
    });
  }

  //1) We want to get the form data
  //2) Format it correctly
  //3) Pass it to a service called "Users"
  //4) to a method called Register
  //5) and post that to the server


  //onSubmit(fun: FormGroup) {
  //console.log(fun.value);
  //console.log(fun.valid);
  //console.log(this.router);
  //this.registerForm.reset();
  //}
}


