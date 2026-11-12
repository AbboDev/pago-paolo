const it = {
  common: {
    appName: 'Pago Paolo',
    loading: 'Caricamento...',
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Elimina',
    edit: 'Modifica',
    confirm: 'Conferma',
    back: 'Indietro',
    language: 'Lingua',
    switchTo: 'Passa a {{lang}}',
    currentLanguage: 'Lingua attuale: {{lang}}',
  },
  home: {
    title: 'Chi paga?',
    subtitle: 'Gestisci le spese condivise e salda i debiti con facilità.',
    editPrompt: 'Modifica app/index.tsx per modificare questa schermata.',
    totalBalance: 'Saldo totale',
    youOwe: 'Devi saldare',
    youAreOwed: 'Ti spetta',
    settled: 'Tutto saldato',
    addExpense: 'Aggiungi spesa',
    recentExpenses: 'Spese recenti',
    noExpenses: 'Nessuna spesa registrata',
  },
  expenses: {
    title: 'Spesa',
    amount: 'Importo',
    paidBy: 'Pagato da',
    splitWith: 'Diviso con',
    category: 'Categoria',
    description: 'Descrizione',
    date: 'Data',
  },
  settings: {
    title: 'Impostazioni',
    language: "Lingua dell'app",
    italian: 'Italiano',
    english: 'Inglese',
  },
} as const;

export default it;
