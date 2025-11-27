 const express=require("express");
 const router=express.Router();
 const wrapAsync=require("../utility/wrapAsync.js");
 const Listing=require("../models/listing.js");
 const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer = require("multer");
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});





//Index Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("image"),  // FIX HERE (was listing[image])
    validateListing,
    wrapAsync(listingController.createListing)
);

//new Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show Route
router.route("/:id").get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//Create Route
//router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));  






//edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update route


//Delete Route
 

 module.exports=router;

 
  