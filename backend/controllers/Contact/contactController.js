import Contact from "../../models/Contact/Contact.js";
import sendEmail from "../../utils/sendEmail.js";


// CREATE CONTACT

export const createContact = async (
  req,
  res
) => {

  try {

    const contact =
      await Contact.create(req.body);

    res.status(201).json({
      success: true,
      contact,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// GET ALL CONTACTS

export const getContacts = async (
  req,
  res
) => {

  try {

    const contacts =
      await Contact.find()
      .sort({ createdAt: -1 });

    res.json(contacts);

  } catch (error) {

    res.status(500).json({
      success: false,
    });

  }

};


// RESOLVE CONTACT

export const resolveContact =
async (req, res) => {

  try {

    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {

      return res.status(404).json({
        message: "Contact not found",
      });

    }

    contact.status = "resolved";

    contact.resolvedAt = new Date();

    await contact.save();

    // EMAIL USER

    await sendEmail(

      contact.email,

      "Skillora Support Update",

`Hello ${contact.name},

Your support query has been resolved successfully.

Thank you for contacting Skillora.

Team Skillora`

    );

    res.json({
      success: true,
      message: "Resolved successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
    });

  }

};