const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      }

      // 🔍 DEBUG: log the decoded payload
      console.log("Decoded JWT:", decoded);

      const userId = decoded.userId || decoded.id; // handle both cases
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Invalid token payload (missing userId or id)",
        });
      }

      req.user = { _id: userId };
      next();
    });
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
