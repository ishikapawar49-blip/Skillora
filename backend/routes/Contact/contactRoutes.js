import express from "express";

import {
  createContact,
  getContacts,
  resolveContact,
} from "../../controllers/Contact/contactController.js";

const router = express.Router();

router.post(
  "/",
  createContact
);

router.get("/", getContacts);

router.put(
  "/resolve/:id",
  resolveContact
);

export default router;