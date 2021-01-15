export interface User{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    userName?:string
    expensesEntered?:number;
}
export interface AuthUser{
  userName?: string;
  password?: string;
}

export interface infoOfExpense{
    numofItems: number | String;
    totalAmount: string;
    totalOfCategory: string;
}

export const expense_categories: string[] = ['Groceries', 'Transportation', 'Rent', 'Other bills', 'Insurance', 'Dining out'];
export const expense_type: string[] = ['Cash','Debit Card','Credit Card'];
