const express = require("express");
const router = express.Router();    // ⭐ REQUIRED AT TOP

const wrapAsync = require("../utility/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// Multer + Cloudinary
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// ================= HOME + CREATE =================
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
      isLoggedIn,
      upload.single("image"),
      validateListing,
      wrapAsync(listingController.createListing)
  );

// ================= NEW LISTING PAGE =================
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ================= SHOW / UPDATE / DELETE =================
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
      isLoggedIn,
      isOwner,
      upload.single("image"),       // <--- FIXED
      validateListing,
      wrapAsync(listingController.updateListing)
  )
  .delete(
      isLoggedIn,
      isOwner,
      wrapAsync(listingController.destroyListing)
  );

// ================= EDIT PAGE =================
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;   // ⭐ Export required
