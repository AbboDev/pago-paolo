const en = {
  common: {
    appName: 'Pago Paolo',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    confirm: 'Confirm',
    back: 'Back',
    language: 'Language',
    switchTo: 'Switch to {{lang}}',
    currentLanguage: 'Current language: {{lang}}',
  },
  home: {
    title: 'Who pays?',
    subtitle: 'Manage shared expenses and settle debts with ease.',
    editPrompt: 'Edit app/index.tsx to edit this screen.',
    totalBalance: 'Total balance',
    youOwe: 'You owe',
    youAreOwed: 'You are owed',
    settled: 'All settled',
    addExpense: 'Add expense',
    recentExpenses: 'Recent expenses',
    noExpenses: 'No expenses recorded',
  },
  expenses: {
    title: 'Expense',
    amount: 'Amount',
    paidBy: 'Paid by',
    splitWith: 'Split with',
    category: 'Category',
    description: 'Description',
    date: 'Date',
  },
  settings: {
    title: 'Settings',
    language: 'App Language',
    italian: 'Italian',
    english: 'English',
  },
} as const;

export default en;
