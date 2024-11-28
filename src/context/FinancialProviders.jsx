import { createContext, useState } from 'react';


const FinanceContext = createContext();


export const FinanceProvider = ({ children }) => {

  const [totalIncomeMonth, setTotalIncomeMonth] = useState(0);
  const [totalIncomeYear, setTotalIncomeYear] = useState(0);
  const [totalExpenseMonth, setTotalExpenseMonth] = useState(0);
  const [totalExpenseYear, setTotalExpenseYear] = useState(0);


  const updateIncomeMonth = (amount) => setTotalIncomeMonth(prev => prev + amount);
  const updateIncomeYear = (amount) => setTotalIncomeYear(prev => prev + amount);
  const updateExpenseMonth = (amount) => setTotalExpenseMonth(prev => prev + amount);
  const updateExpenseYear = (amount) => setTotalExpenseYear(prev => prev + amount);


  const getRemainingBalance = () => (totalIncomeMonth - totalExpenseMonth);

  return (
    <FinanceContext.Provider value={{
      totalIncomeMonth,
      totalIncomeYear,
      totalExpenseMonth,
      totalExpenseYear,
      updateIncomeMonth,
      updateIncomeYear,
      updateExpenseMonth,
      updateExpenseYear,
      getRemainingBalance,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
