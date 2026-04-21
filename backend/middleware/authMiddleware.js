import jwt from "jsonwebtoken";
import Admin from "../models/Admin/Admin.js";
import Vendor from "../models/Vendor/Vendor.js";
import User from "../models/User/User.js"; // ✅ ADD THIS

// 🔐 ADMIN PROTECT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token" });
  }
};


// 🔐 USER PROTECT
export const protectUser = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      console.log("MIDDLEWARE USER:", user); // debug

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Not authorized user" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};


// 🔐 VENDOR PROTECT
export const protectVendor = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const vendor = await Vendor.findById(decoded.id);

      if (!vendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }

      req.vendor = vendor;

      console.log("MIDDLEWARE VENDOR:", vendor); // 🔥 DEBUG

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Not authorized vendor" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};

export default protect;