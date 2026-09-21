const fs = require("fs");
const path = require("path");
const db = require("../config/db");

const seedFile = path.join(__dirname, "seeds", "development.sql");

function runSeed() {
    const sql = fs.readFileSync(seedFile, "utf8");

    db.query(sql, (err) => {
        if (err) {
            console.error("Seed failed:", err);

            db.end(() => {
                process.exit(1);
            });

            return;
        }

        console.log("Development seed completed successfully.");

        db.end(() => {
            process.exit(0);
        });
    });
}

runSeed();
