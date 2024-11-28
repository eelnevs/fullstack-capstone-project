//Step 1 - Task 2: Import necessary packages
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const pino = require("pino");

//Step 1 - Task 3: Create a Pino logger instance
const logger = pino();
dotenv.config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

router.post(
	"/register",
	body("email").notEmpty().isEmail(),
	body("firstName").notEmpty(),
	body("lastName").notEmpty(),
	body("password").notEmpty().isLength({ min: 6, max: 32 }),
	async (req, res) => {
		//Step 2
		try {
			const validation = validationResult(req);
			if (!validation.isEmpty()) {
				return res.status(400).send({
					error: "invalid field values",
				});
			}

			// Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
			const db = await connectToDatabase();
			// Task 2: Access MongoDB collection
			const collection = db.collection("users");
			//Task 3: Check for existing email
			const existing = await collection
				.findOne({ email: req.body.email })
			if (existing) {
				return res
					.status(200)
					.send({error: `User email already exists, please login instead.`});
			}

			const salt = await bcryptjs.genSalt(10);
			const hash = await bcryptjs.hash(req.body.password, salt);
			const email = req.body.email;
			const firstName = req.body.firstName;
			//Task 4: Save user details in database
			const user = await collection.insertOne({
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: hash,
				createdAt: new Date(),
			});
			//Task 5: Create JWT authentication with user._id as payload
			const authtoken = jwt.sign(
				{ user: { id: user.insertedId } },
				JWT_SECRET
			);

			logger.info("User registered successfully");
			res.json({ authtoken, firstName, email });
		} catch (e) {
			return res.status(500).send({error: "Internal server error"});
		}
	}
);

router.post(
	"/login",
	body("email").notEmpty().isEmail(),
	body("password").notEmpty().isLength({ min: 6, max: 32 }),
	async (req, res) => {
		try {
			const validation = validationResult(req);
			if (!validation.isEmpty()) {
				logger.error("invalid credential")
				return res.status(400).send({
					error: "invalid credential",
				});
			}

			// Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
			const db = await connectToDatabase();
			// Task 2: Access MongoDB `users` collection
			const collection = db.collection("users");
			// Task 3: Check for user credentials in database
			const user = await collection.findOne({ email: req.body.email });
			if (!user) {
				logger.error("User not found")
				return res.status(404).send({
					error: "No existing user found. Please register instead."
				})
			}
			// Task 4: Task 4: Check if the password matches the encrypyted password and send appropriate message on mismatch
			const compare = await bcryptjs.compare(req.body.password, user.password);
			if (!compare) {
				logger.error("Incorrect password");
				return res.status(404).send({
					error: "Incorrect password"
				})
			}
			// Task 5: Fetch user details from database
			const userName = user.firstName;
			const userEmail = user.email;
			// Task 6: Create JWT authentication if passwords match with user._id as payload
			const authtoken = jwt.sign(
				{ user: { id: user.insertedId } },
				JWT_SECRET
			);
			logger.info("User successfully login.")
			res.json({ authtoken, userName, userEmail });
			// Task 7: Send appropriate message if user not found
			// already did under task 3.
		} catch (e) {
			logger.error(e)
			return res.status(500).send({error: "Internal server error"});
		}
	}
);

module.exports = router;
