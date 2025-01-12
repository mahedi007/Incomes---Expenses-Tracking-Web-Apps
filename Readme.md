# Incomes and Expense Tracking App

A modular web application to efficiently track monthly incomes and daily expenses. Built with Node.js, Express, and EJS, this app provides a clean and professional dashboard for users to manage their financial data with ease.

## Features

### Monthly Income Management:
- Add and edit monthly salaries.
- Include multiple extra income sources for each month.
- View total income (salary + extra incomes) for a selected month.

### Daily Expense Tracking:
- Add, update, and delete daily expenses.
- Expenses are automatically deducted from the total monthly income.
- View expenses for specific dates.

### Dashboard Overview:
- View monthly summaries of income, expenses, and remaining balance.
- Select specific months to view detailed income and expense records.
- A calendar system for selecting dates and tracking daily expenses.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Database**: SQLite3
- **Styling**: CSS (for professional and minimalistic dashboard design)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahedi007/incomes-expense-tracking.git
   ```
2. Navigate to the project directory:
   ```bash
   cd incomes-expense-tracking
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Usage

### Input Monthly Salaries and Extra Incomes:
- Select a month and add your salary and extra income sources.

### Add Daily Expenses:
- Choose a specific day of a month and add your expenses with a name and amount.

### Track Finances:
- View detailed reports of income, expenses, and balance for a specific month or day.

### Edit or Delete Entries:
- Easily update or remove any income or expense entry.

## Directory Structure

```
incomes-expense-tracking/
├── public/
│   ├── css/
│   │   └── styles.css
├── views/
│   ├── index.ejs
│   ├── partials/
├── routes/
│   └── index.js
├── app.js
├── package.json
└── README.md
```

## Future Enhancements

- Add user authentication for personalized data management.
- Export financial reports as PDF or Excel files.
- Integrate graph visualizations for better insights into income and expenses.

## Contributing

Contributions are welcome! If you'd like to improve this app or add new features:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your forked repository and create a pull request.

## License

This project is open-source and available under the MIT License.

## Author

Created by **S.M. Mahedi Hasan**  
[GitHub Profile](https://github.com/mahedi007)

