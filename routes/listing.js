router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
);

// new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show / edit / delete
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("image"),     // FIXED HERE
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// edit page
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
