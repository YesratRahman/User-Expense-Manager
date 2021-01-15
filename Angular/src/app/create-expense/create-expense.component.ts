import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {UserCom} from '../Service/userCom';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  newExpenseForm: FormGroup;
  userName: FormControl;
  category: FormControl;
  expenseDate: FormControl;
  amount: FormControl;
  description: FormControl;
  reoccuring: FormControl;
  recipient: FormControl;
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  error = '';

  constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private userCom: UserCom
  )
  {

  }


  ngOnInit() {

    this.userName = this.formBuilder.control('', Validators.required),
      this.category = this.formBuilder.control('', Validators.required),
      this.expenseDate = this.formBuilder.control(''),
      this.amount = this.formBuilder.control('', Validators.required),
      this.description = this.formBuilder.control('', Validators.required),
      this.reoccuring = this.formBuilder.control(''),
      this.recipient = this.formBuilder.control('', Validators.required);

    this.newExpenseForm = this.formBuilder.group({
      userName: this.userName,
      category: this.category,
      expenseDate: this.expenseDate,
      amount: this.amount,
      description: this.description,
      reoccuring: this.reoccuring,
      recipient: this.recipient

    });
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.newExpenseForm);
    if (this.newExpenseForm.invalid) {
      console.log(this.newExpenseForm, 'Error in onSubmit()');
      return;
    }
    this.isLoading = true;
    this.userCom.createTransaction(this.newExpenseForm.value).pipe().subscribe((data) =>{
        this.router.navigate(['/']);
      },
      error => {
        console.log('Error while creating:', error);
        this.isLoading = false;
      });
  }
}
