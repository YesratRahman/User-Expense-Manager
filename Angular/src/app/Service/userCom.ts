import {HttpClient, HttpHeaders }from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User, AuthUser} from '../models/user-model';
import {Expense} from "../shared/models/expense-model";

@Injectable({ providedIn: 'root' })
export class UserCom{


    constructor(private http: HttpClient){}

    register(user: User){
        return this.http.post("http://localhost:4000/users/register", user, { responseType: "text"});
    }

    login(user: AuthUser){

      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Accept': 'text/html, application/xhtml+xml, */*',
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }),
      //   responseType: 'text'
      // };

      console.log(user);
      return this.http.post(`http://localhost:4000/users/authenticate`, user, { responseType: "text"});
    }

    createTransaction(expense: Expense){
      console.log(expense);
      return this.http.post(`http://localhost:4000/transaction/create`, expense, { responseType: "text"});
    }
}
