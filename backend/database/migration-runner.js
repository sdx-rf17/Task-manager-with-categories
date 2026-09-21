const fs = require("fs");
const path = require("path");
const db = require("../config/db");

const migrationsDir = path.join(__dirname, "migrations");

function query(sql, values = []) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        });
    });
}

async function runMigrations() {
    try {
        console.log("Running database migrations...");

        await query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL UNIQUE,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const files = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort();

        const executed = await query(
            "SELECT filename FROM migrations ORDER BY id"
        );

        const executedFiles = new Set(
            executed.map((migration) => migration.filename)
        );

        for (const file of files) {
            if (executedFiles.has(file)) {
                console.log(`✓ Already applied: ${file}`);
                continue;
            }

            console.log(`→ Applying: ${file}`);

            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, "utf8");

            await query(sql);

            await query(
                "INSERT INTO migrations (filename) VALUES (?)",
                [file]
            );

            console.log(`✓ Applied: ${file}`);
        }

        console.log("Migrations completed successfully.");

        db.end((err) => {
            if (err) {
                console.error("Failed to close database connection:", err);
                process.exit(1);
            }

            process.exit(0);
        });
    } catch (error) {
        console.error("Migration failed:", error);

        db.end(() => {
            process.exit(1);
        });
    }
}

runMigrations();
