-- usamos la base de datos
USE expenses_management
-- Inicialización de la base de datos para gestión de gastos mensuales
-- Initialization of the database for monthly expense management

-- Tabla Usuario
-- Table User
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, -- Unique email for each user
    password VARCHAR(255) NOT NULL, -- Encrypted password for authentication
    phone_number VARCHAR(20),
    initial_salary DECIMAL(15, 2) NOT NULL,
    current_salary DECIMAL(15, 2) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Tabla Categoria
-- Table Category
CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,  -- Relacionar categoría con el usuario
    name VARCHAR(50) NOT NULL,
    type ENUM('income', 'expense') -- Categories specific to income or expenses
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Tabla Transaccion
-- Table Transaction
CREATE TABLE Transaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    description VARCHAR(255),
    category_id INT,
    period VARCHAR(7) NOT NULL, -- Stores "YYYY-MM" to indicate the month
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE SET NULL
);

-- Tabla Deuda
-- Table Debt
CREATE TABLE Debt (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- Optional: Deadline for paying the debt
    total_amount DECIMAL(15, 2) NOT NULL,
    remaining_amount DECIMAL(15, 2) NOT NULL,
    interest DECIMAL(5, 2), -- Percentage of interest, if applicable
    description VARCHAR(255),
    status ENUM('pending', 'paid') DEFAULT 'pending',
    recurring BOOLEAN DEFAULT FALSE, -- Indicates if it is a recurring debt
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Tabla Pago_Deuda
-- Table Debt_Payment
CREATE TABLE Debt_Payment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    debt_id INT NOT NULL,
    date DATE NOT NULL,
    paid_amount DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (debt_id) REFERENCES Debt(id) ON DELETE CASCADE
);

-- Tabla Historico_Sueldo
-- Table Salary_History
CREATE TABLE Salary_History (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previous_salary DECIMAL(15, 2) NOT NULL,
    new_salary DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Tabla Presupuesto
-- Table Budget
CREATE TABLE Budget (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT,
    period VARCHAR(7) NOT NULL, -- Month and year (YYYY-MM)
    max_amount DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE SET NULL
);


