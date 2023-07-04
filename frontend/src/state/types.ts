export interface GetKpisResponse {
  _id: string;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  monthlyData: MonthlyData[];
  expensesByCategory: ExpensesByCategory;
  dailyyData: DailyData[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MonthlyData {
  _id: string;
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
  id: string;
}

export interface DailyData {
  _id: string;
  date: string;
  revenue: number;
  expenses: number;
  id: string;
}

export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface GetProductsResponse {
  _id: string;
  id: string;
  __v: number;
  price: number;
  expense: number;
  totalExpenses: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  _id: string;
  id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface Country {
  name: string;
  url: string;
}