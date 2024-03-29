const jwt = require("jsonwebtoken");

const Staff = require("../models/Staff");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    res.staffData = decoded;

    
    Staff.find({ email: decoded.email })
      .exec()
      .then((data) => {
        if (data[0].role !== "Super") {
          return res.status(401).json({ message: "Unauthorized" });
        }
      });

    next();
  } catch (err) {
    res.status(403).json({
      message: "Unauthenticated",
    });
  }
};
