-- USE DATABASE
USE expenses_management;

-- Insertar un usuario
-- Insert a user
INSERT INTO User (name, email, password, phone_number, initial_salary, current_salary)
VALUES ('John Doe', 'john.doe@example.com', 'encrypted_password', '1234567890', 1000.00, 900.00);

-- Insertar categorías
-- Insert categories
INSERT INTO Category (name, type)
VALUES ('Salary', 'income'),
       ('Groceries', 'expense'),
       ('Entertainment', 'expense'),
       ('Transport', 'expense');

-- Insertar una transacción de ingreso (salario)
-- Insert an income transaction (salary)
INSERT INTO Transaction (user_id, date, amount, type, description, category_id, period)
VALUES (1, '2024-12-01', 1000.00, 'income', 'Monthly salary', 1, '2024-12');

-- Insertar una transacción de gasto
-- Insert an expense transaction
INSERT INTO Transaction (user_id, date, amount, type, description, category_id, period)
VALUES (1, '2024-12-02', 50.00, 'expense', 'Grocery shopping', 2, '2024-12'),
       (1, '2024-12-03', 20.00, 'expense', 'Movie night', 3, '2024-12'),
       (1, '2024-12-04', 15.00, 'expense', 'Bus fare', 4, '2024-12');

-- Insertar una deuda
-- Insert a debt
INSERT INTO Debt (user_id, start_date, end_date, total_amount, remaining_amount, interest, description, status, recurring)
VALUES (1, '2024-12-01', '2025-01-01', 100.00, 80.00, 5.00, 'Loan from a friend', 'pending', FALSE);

-- Insertar un pago de deuda
-- Insert a debt payment
INSERT INTO Debt_Payment (debt_id, date, paid_amount)
VALUES (1, '2024-12-10', 20.00);

-- Insertar un registro en el histórico de sueldo
-- Insert a record into the salary history
INSERT INTO Salary_History (user_id, change_date, previous_salary, new_salary)
VALUES (1, '2024-11-01', 950.00, 1000.00);

-- Insertar un presupuesto
-- Insert a budget
INSERT INTO Budget (user_id, category_id, period, max_amount)
VALUES (1, 2, '2024-12', 300.00), -- Groceries
       (1, 3, '2024-12', 100.00), -- Entertainment
       (1, 4, '2024-12', 50.00);  -- Transport