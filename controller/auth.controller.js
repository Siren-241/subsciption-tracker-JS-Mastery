import mongoose from "mongoose"
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
	// Implement signup logic
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Logic to create a new user
		
		// Destructure req
		const { name, email, password } = req.body; 

		// Check if user already exists
		const existingUser = await User.findOne({ email }); // await is needed, donot remove it
		
		if(existingUser) {
			const error = new Error('User already exists')
			error.statusCode = 409;
			throw error;
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
	
		const newUsers = await User.create([{
			name, 
			email,
			password: hashedPassword
		}], { session });

		const token = jwt.sign({ userId: newUsers[0]._id } , JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } );

		await session.commitTransaction();

		res.status(201).json({ 
			success: true, 
			message: 'User created successfully',
			data: {
				token,
				user: newUsers[0]
			}
		})

	} catch(error) {
		console.error(error);
		await session.abortTransaction();
		next(error);
	} finally {
		await session.endSession();
	}
}


export const signIn = async (req, res, next) => {
	// Implement signin logic
	
}

export const signOut = async (req, res, next) => {
	// Implement signout logic
	
}

