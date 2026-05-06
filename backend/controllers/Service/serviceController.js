import Service from "../../models/Service/Service.js";
import Vendor from "../../models/Vendor/Vendor.js";

export const getAllServices = async (req, res) => {

  try {

    const {
      vendor,
      category,
      lat,
      lng,
      city
    } = req.query;

    // =========================================
    // VENDOR FILTER
    // =========================================

    if (vendor) {

      const services = await Service.find({
        vendor
      }).populate("vendor");

      return res.json(services);

    }

    // =========================================
    // CATEGORY FILTER
    // =========================================

    let filter = {};

    if (category) {
      filter.category = category;
    }

    // =========================================
    // NEARBY VENDORS
    // =========================================

    let nearbyVendors = [];

    if (lat && lng) {

      nearbyVendors = await Vendor.find({

        status: "approved",

        location: {

          $near: {

            $geometry: {

              type: "Point",

              coordinates: [
                Number(lng),
                Number(lat)
              ]

            },

            $maxDistance: 20000

          }

        }

      });

    }

    // =========================================
    // CITY VENDORS
    // =========================================

    const cityVendors = await Vendor.find({

      status: "approved",

      city: new RegExp(city, "i")

    });

    // =========================================
    // MERGE
    // =========================================

    const mergedVendors = [

      ...nearbyVendors,

      ...cityVendors.filter(
        cityVendor =>

          !nearbyVendors.some(
            nearby =>
              nearby._id.toString() ===
              cityVendor._id.toString()
          )
      )

    ];

    const vendorIds = mergedVendors.map(
      v => v._id
    );

    // =========================================
    // SERVICES
    // =========================================

    const services = await Service.find({

      ...filter,

      vendor: {
        $in: vendorIds
      }

    }).populate("vendor");

    res.json(services);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};