const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db'); 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Serve the home page
app.get('/', (req, res) => {
    const selectedMonth = req.query.month || '2025-01'; 

    // Get all distinct months
    db.all('SELECT DISTINCT month FROM inputs ORDER BY month ASC', (err, months) => {
        if (err) {
            console.error(err);
            return res.send('Error fetching months');
        }

        // Initialize monthData object to store data for each month
        const monthData = {};

        // Fetch data for each month and store it in monthData
        months.forEach((month, index) => {
            db.all('SELECT * FROM inputs WHERE month = ?', [month.month], (err, rows) => {
                if (err) {
                    console.error(err);
                    return res.send('Error fetching data');
                }

                // Calculate total of numeric values for the month
                const total = rows
                    .filter(row => row.is_numeric === 1)
                    .reduce((sum, row) => sum + parseFloat(row.value), 0);

                monthData[month.month] = { inputs: rows, total };

                // If it's the last month in the list, render the page
                if (index === months.length - 1) {
                    // Fetch daily expenses for the selected month
                    db.all('SELECT * FROM daily_expenses WHERE month = ?', [selectedMonth], (err, expenseRows) => {
                        if (err) {
                            console.error(err);
                            return res.send('Error fetching daily expenses');
                        }

                        // Calculate the total of numeric daily expenses for the selected month
                        const dailyExpenseTotal = expenseRows
                            .filter(row => row.is_numeric === 1)
                            .reduce((sum, row) => sum + parseFloat(row.value), 0);

                        // Final balance after subtracting daily expenses for the selected month
                        const finalBalance = monthData[selectedMonth] ? monthData[selectedMonth].total - dailyExpenseTotal : 0;

                        // Check if there's any data for the selected month and pass empty data if none
                        const monthExists = monthData[selectedMonth] && monthData[selectedMonth].inputs.length > 0;

                        res.render('index', {
                            months,
                            monthData,
                            selectedMonth,
                            dailyExpenses: expenseRows,
                            finalBalance,         
                            monthExists           
                        });
                    });
                }
            });
        });

    });
});



// Handle the form submission for adding new income value pairs
app.post('/submit', (req, res) => {
    const labels = [];
    const values = [];
    const month = req.body.month;  

    for (const key in req.body) {
        if (key.startsWith('label')) {
            labels.push(req.body[key]);
        } else if (key.startsWith('value')) {
            values.push(req.body[key]);
        }
    }

    // Insert each income and value pair into the database
    labels.forEach((label, index) => {
        const value = values[index];
        const isNumeric = !isNaN(value) ? 1 : 0;

        db.run('INSERT INTO inputs (label, value, is_numeric, month) VALUES (?, ?, ?, ?)', [label, value, isNumeric, month], (err) => {
            if (err) {
                console.error('Error inserting data:', err);
            }
        });
    });

    res.redirect('/');
});



// Handle adding daily expense
app.post('/daily-expense/:month', (req, res) => {
    const { label, value, date, month } = req.body;  // Added date and month field
    const isNumeric = !isNaN(value) ? 1 : 0;

    // Insert daily expense with month and date
    db.run('INSERT INTO daily_expenses (label, value, is_numeric, month, date) VALUES (?, ?, ?, ?, ?)', [label, value, isNumeric, month, date], (err) => {
        if (err) {
            console.error('Error inserting daily expense:', err);
        }
        res.redirect(`/?month=${month}`);
    });
});

// Handle editing a income-value pair for stored inputs
app.post('/edit/:id', (req, res) => {
    const inputId = req.params.id;
    const newLabel = req.body.label;
    const newValue = req.body.value;
    const isNumeric = !isNaN(newValue) ? 1 : 0;

    db.run('UPDATE inputs SET label = ?, value = ?, is_numeric = ? WHERE id = ?', [newLabel, newValue, isNumeric, inputId], function(err) {
        if (err) {
            console.error('Error updating input:', err);
            return res.send('Error updating input');
        }

        console.log(`Input with ID ${inputId} updated successfully!`);
        res.redirect('/');
    });
});

// Handle deleting a income-value pair
app.post('/delete/:id', (req, res) => {
    const inputId = req.params.id;

    db.run('DELETE FROM inputs WHERE id = ?', [inputId], function(err) {
        if (err) {
            console.error('Error deleting input:', err);
            return res.send('Error deleting input');
        }

        console.log(`Input with ID ${inputId} deleted successfully!`);
        res.redirect('/');
    });
});

// Handle editing a daily expense
app.post('/edit-daily-expense/:id', (req, res) => {
    const expenseId = req.params.id;
    const newLabel = req.body.label;
    const newValue = req.body.value;
    const isNumeric = !isNaN(newValue) ? 1 : 0;

    db.run('UPDATE daily_expenses SET label = ?, value = ?, is_numeric = ? WHERE id = ?', [newLabel, newValue, isNumeric, expenseId], function(err) {
        if (err) {
            console.error('Error updating daily expense:', err);
            return res.send('Error updating daily expense');
        }

        console.log(`Daily expense with ID ${expenseId} updated successfully!`);
        res.redirect('/');
    });
});

// Handle deleting a daily expense
app.post('/delete-daily-expense/:id', (req, res) => {
    const expenseId = req.params.id;

    db.run('DELETE FROM daily_expenses WHERE id = ?', [expenseId], function(err) {
        if (err) {
            console.error('Error deleting daily expense:', err);
            return res.send('Error deleting daily expense');
        }

        console.log(`Daily expense with ID ${expenseId} deleted successfully!`);
        res.redirect('/');
    });
});

// Set view engine
app.set('view engine', 'ejs');

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
