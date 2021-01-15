export interface Income{
    userId?: string;
    incomeName: string;
    incomeCategory: string;
    incomeType: string; // either cash, debit, credit
    date: Date |string;
    incomeAmount: number | string;
}