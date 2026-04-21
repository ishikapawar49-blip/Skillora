import Service from "../../models/Service/Service.js";

export const getAllServices = async (req, res) => {
  try {

    const { vendor, category } = req.query;

    let filter = {};

    // 🔥 Vendor filter
    if (vendor) {
      filter.vendor = vendor;
    }

    // 🔥 Category filter
    if (category) {
      filter.category = category;
    }

    const services = await Service.find(filter);

    res.json(services);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching services" });
  }
};
