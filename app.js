const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/api/add-customer", async (req, res) => {
    const { phone_number, name } = req.body;

    if (!phone_number || !name) {
        res.status(400).send("Phone number and name must be provided.");
        return;
    }

    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "customers",
        });

        const sql = `INSERT INTO customers (phone_number, name) VALUES (?, ?)`;
        const result = await connection.query(sql, [phone_number, name]);

        if (result.affectedRows === 1) {
            res.status(201).send("Customer added successfully.");
        } else {
            res.status(500).send("An error occurred while adding the customer.");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});
