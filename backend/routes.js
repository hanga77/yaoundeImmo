const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const router = express.Router();
const saltRounds = 10;

// CONSTANTS - DEFINED AT THE TOP
// =================================================================
// This list should be kept in sync with the frontend constants
// It acts as a whitelist to prevent arbitrary table access.
const ALLOWED_TABLES = [
  "users", "station", "materiels", "commentaire", "categorie", "entretion",
  "fiche", "fichecrmensuel", "fichectrl", "ficheinspection", "ficheintervention",
  "ficheptsituationstation", "fichespa", "grade", "logistique", "nbre_message",
  "personnel", "pointsituation", "roles", "spastation", "synthesehebdo",
  "typeinspection", "typeintervention", "users_roles", "zones",
];

const FULL_CRUD_TABLES = [
  "users", "station", "materiels", "commentaire", "categorie", "entretion",
  "fiche", "fichecrmensuel", "fichectrl", "ficheinspection", "ficheintervention",
  "ficheptsituationstation", "fichespa", "grade", "logistique", "nbre_message",
  "personnel", "pointsituation", "roles", "spastation", "synthesehebdo",
  "typeinspection", "typeintervention", "users_roles", "zones",
];

// Whitelists for CUD operations
const CREATABLE_TABLES = FULL_CRUD_TABLES;
const EDITABLE_TABLES = FULL_CRUD_TABLES;
const DELETABLE_TABLES = FULL_CRUD_TABLES;


// GET /api/stats/overview - Fetch aggregate stats for the dashboard
// DEFINED FIRST to avoid any potential routing conflicts.
router.get('/stats/overview', async (req, res, next) => {
    const tablesToCount = ['users', 'zones', 'station', 'fichectrl', 'materiels', 'ficheintervention'];
    try {
        const countPromises = tablesToCount.map(table => {
            if (ALLOWED_TABLES.includes(table)) {
                return db.execute(`SELECT COUNT(*) as count FROM \`${table}\``)
                         .then(([rows]) => ({ table, count: rows[0].count }));
            }
            return Promise.resolve({ table, count: 0 });
        });

        const results = await Promise.all(countPromises);

        const stats = results.reduce((acc, result) => {
            acc[result.table] = result.count;
            return acc;
        }, {});

        res.json(stats);

    } catch (error) {
        next(error);
    }
});

/**
 * Sanitizes incoming data by converting empty strings to null.
 * This is crucial because inserting an empty string into a numeric or date column
 * will cause a database error.
 * @param {object} data The data object from the request body.
 * @returns {object} A new object with empty strings replaced by null.
 */
const sanitizeData = (data) => {
  const sanitized = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      sanitized[key] = data[key] === '' ? null : data[key];
    }
  }
  return sanitized;
};


// =================================================================
// == SPECIFIC ROUTES (MUST BE DEFINED BEFORE GENERIC ROUTES)
// =================================================================

// POST /api/login - User authentication
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);

  } catch (error) {
    next(error);
  }
});

// POST /api/users/reset-all-passwords - Reset all user passwords
router.post('/users/reset-all-passwords', async (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Received request to reset all user passwords.`);
    const newPassword = 'password123'; // The new default password
    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const query = 'UPDATE `users` SET `password` = ?';
        const [result] = await db.execute(query, [hashedPassword]);

        console.log(`[${new Date().toISOString()}] Passwords reset successfully for ${result.affectedRows} users.`);
        res.json({ 
            message: 'All user passwords have been reset successfully.',
            affectedRows: result.affectedRows 
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error during password reset:`, error);
        next(error);
    }
});

// POST /api/users/:id/reset-password - Reset a single user's password
router.post('/users/:id/reset-password', async (req, res, next) => {
    const { id } = req.params;
    const newPassword = 'password123';

    if (isNaN(parseInt(id, 10))) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }
    
    console.log(`[${new Date().toISOString()}] Received request to reset password for user ID: ${id}.`);

    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const query = 'UPDATE `users` SET `password` = ? WHERE `id` = ?';
        const [result] = await db.execute(query, [hashedPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `User with ID ${id} not found.` });
        }

        console.log(`[${new Date().toISOString()}] Password reset successfully for user ID: ${id}.`);
        res.json({ 
            message: `Password for user ID ${id} has been reset successfully.`
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error resetting password for user ID ${id}:`, error);
        next(error);
    }
});


// GET /api/tables/:tableName/schema - Fetch column names for a table (more specific than /:tableName)
router.get('/tables/:tableName/schema', async (req, res, next) => {
  const { tableName } = req.params;

  if (!ALLOWED_TABLES.includes(tableName)) {
    return res.status(404).json({ message: `Table '${tableName}' not found or access is not permitted.` });
  }

  const dbName = process.env.DB_NAME;
  const query = `
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
    ORDER BY ORDINAL_POSITION
  `;

  try {
    const [columns] = await db.execute(query, [dbName, tableName]);
    const columnNames = columns.map(col => col.COLUMN_NAME);
    res.json(columnNames);
  } catch (error) {
    next(error);
  }
});


// =================================================================
// == GENERIC TABLE ROUTES (MUST BE LAST)
// =================================================================

// GET /api/tables/:tableName - Fetch data from a specific table
router.get('/tables/:tableName', async (req, res, next) => {
  const { tableName } = req.params;

  if (!ALLOWED_TABLES.includes(tableName)) {
    return res.status(404).json({ message: `Table '${tableName}' not found or access is not permitted.` });
  }

  try {
    const [rows] = await db.execute(`SELECT * FROM \`${tableName}\``);
    
    if (tableName === 'users' && Array.isArray(rows)) {
      const usersWithoutPasswords = rows.map(user => {
        const { password, ...rest } = user;
        return rest;
      });
      return res.json(usersWithoutPasswords);
    }
    
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// POST /api/tables/:tableName - Create a new row in a specific table
router.post('/tables/:tableName', async (req, res, next) => {
    const { tableName } = req.params;
    let newData = req.body;

    if (!CREATABLE_TABLES.includes(tableName)) {
        return res.status(403).json({ message: `Table '${tableName}' does not support creation.` });
    }
    
    if (!newData || Object.keys(newData).length === 0) {
        return res.status(400).json({ message: 'No data provided for creation.' });
    }
    
    // Sanitize input: convert empty strings to null to prevent DB errors
    newData = sanitizeData(newData);
    
    // Security: never allow client to set the ID.
    delete newData.id;
    
    // Special handling for creating a new user
    if (tableName === 'users') {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'Password is required for new users.' });
        }
        try {
            newData.password = await bcrypt.hash(password, saltRounds);
            newData.registration_date = new Date(); // Set registration date automatically
        } catch (hashError) {
            return next(hashError); // Pass hashing error to global handler
        }
    }

    const fields = Object.keys(newData);
    const placeholders = fields.map(() => '?').join(', ');
    const values = Object.values(newData);
    
    if (fields.length === 0) {
        return res.status(400).json({ message: 'No valid fields for creation.' });
    }

    const query = `INSERT INTO \`${tableName}\` (\`${fields.join('`, `')}\`) VALUES (${placeholders})`;

    try {
        const [result] = await db.execute(query, values);
        res.status(201).json({ message: 'Row created successfully.', insertId: result.insertId });
    } catch (error) {
        next(error);
    }
});

// PUT /api/tables/:tableName/:id - Update a row in a specific table
router.put('/tables/:tableName/:id', async (req, res, next) => {
    const { tableName, id } = req.params;
    let updates = req.body;

    if (!EDITABLE_TABLES.includes(tableName)) {
        return res.status(403).json({ message: `Table '${tableName}' is not editable.` });
    }

    if (isNaN(parseInt(id, 10))) {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No update data provided.' });
    }
    
    // Sanitize input: convert empty strings to null to prevent DB errors
    updates = sanitizeData(updates);

    delete updates.id;

    // Special handling for user password updates
    if (tableName === 'users') {
        if (updates.password && updates.password.length > 0) {
             try {
                // Hash the new password before updating
                updates.password = await bcrypt.hash(updates.password, saltRounds);
            } catch (hashError) {
                return next(hashError);
            }
        } else {
            // If password is not provided or is empty, do not update it.
            delete updates.password;
        }
    }


    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No valid fields to update.' });
    }

    const setClause = fields.map(field => `\`${field}\` = ?`).join(', ');
    const query = `UPDATE \`${tableName}\` SET ${setClause} WHERE id = ?`;
    const queryParams = [...values, id];

    try {
        const [result] = await db.execute(query, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Row with ID ${id} not found in table '${tableName}'.` });
        }

        res.json({ message: `Row with ID ${id} in table '${tableName}' updated successfully.` });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/tables/:tableName/:id - Delete a row from a specific table
router.delete('/tables/:tableName/:id', async (req, res, next) => {
    const { tableName, id } = req.params;

    if (!DELETABLE_TABLES.includes(tableName)) {
        return res.status(403).json({ message: `Table '${tableName}' does not support deletion.` });
    }

    if (isNaN(parseInt(id, 10))) {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const query = `DELETE FROM \`${tableName}\` WHERE id = ?`;

    try {
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Row with ID ${id} not found in table '${tableName}'.` });
        }

        res.status(200).json({ message: `Row with ID ${id} in table '${tableName}' deleted successfully.` });
    } catch (error) {
        next(error);
    }
});


module.exports = router;