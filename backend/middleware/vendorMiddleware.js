import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor/Vendor.js";

const protectVendor = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

 const vendor = await Vendor.findById(decoded.id).select("-password");

      if (!vendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }

      req.user = vendor; 
      
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

export default protectVendor;