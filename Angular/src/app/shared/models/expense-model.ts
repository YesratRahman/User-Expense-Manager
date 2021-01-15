export interface Expense{
    userId?: string;
    expenseName: string;
    expenseCategory: string;
    expenseType: string; // either cash, debit, credit
    date: Date |string;
    expenseAmount: number | string;
}