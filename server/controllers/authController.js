import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const createToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1d" }
	);
};

export const register = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({ message: "Email already in use" });
	}

	const user = await User.create({ username, email, password });
	const token = createToken(user);

	res.status(201).json({ token });
});

// Login a user
export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide email and password" });
	}
	const user = await User.findOne({ email });
	if (!user || !(await user.comparePassword(password))) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const token = createToken(user);
	res.status(200).json({ token });
});

export const logout = asyncHandler(async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logout successful" });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id).select("-password"); // Exclude password
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	res.status(200).json(user);
});
