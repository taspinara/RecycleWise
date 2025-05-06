import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader?.startsWith("Bearer ")
		? authHeader.split(" ")[1]
		: authHeader; // Allow token without "Bearer"

	if (!token) {
		return res.status(401).json({ message: "Unauthorized: No token" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid or expired token" });
	}
};

export const isAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden: Admins only" });
	}
	next();
};
