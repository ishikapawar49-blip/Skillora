import express from "express";
import { protectUser } from "../../middleware/authMiddleware.js";
import {
  toggleWishlist,
  getWishlist,
} from "../../controllers/User/wishlistController.js";

const router = express.Router();

router.post("/", protectUser, toggleWishlist);
router.get("/", protectUser, getWishlist);

export default router;