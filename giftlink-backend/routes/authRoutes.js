//Step 1 - Task 2: Import necessary packages
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const pino = require('pino');

const app = express();
//Step 1 - Task 3: Create a Pino logger instance
const logger = pino();
dotenv.config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
	//Step 2
	try {
		// Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
		const db = await connectToDatabase();
		// Task 2: Access MongoDB collection
		const collection = db.collection("users");
		//Task 3: Check for existing email
		const existing = await collection
			.find({ email: req.body.email })
			.toArray();
		if (existing.length > 0) {
			return res
				.status(200)
				.send(`User email already exists, please login instead.`);
		}

		const salt = await bcryptjs.genSalt(10);
		const hash = await bcryptjs.hash(req.body.password, salt);
		const email = req.body.email;
		//Task 4: Save user details in database
		const user = await collection.insertOne({
			email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
			password: hash,
            createdAt: new Date(),
		});
		//Task 5: Create JWT authentication with user._id as payload
        const authtoken = jwt.sign({user: {id: user.insertedId}}, JWT_SECRET)

		logger.info("User registered successfully");
		res.json({ authtoken, email });
	} catch (e) {
		return res.status(500).send("Internal server error");
	}
});

module.exports = router;
