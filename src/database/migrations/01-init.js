export const sqlCreateUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT,
        firstName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );
    `;

export const sqlCreateTasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATETIME,
        created_at DATE NOT NULL,
        is_completed BOOLEAN DEFAULT FALSE,
        status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
        user_id INT,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;
