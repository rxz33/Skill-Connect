const Listing = require("../models/listing");

// =========================
// A1 — SEARCH + FILTER LISTING PAGE
// =========================
module.exports.index = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) {
        filter.$or = [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { location: new RegExp(search, "i") },
        ];
    }

    const listings = await Listing.find(filter);
    res.render("listings/index.ejs", { listings, category, search });
};

// =========================
// SHOW NEW LISTING FORM
// =========================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// =========================
// SHOW LISTING DETAILS PAGE
// =========================
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

// =========================
// CREATE NEW LISTING (FINAL)
// =========================
module.exports.createListing = async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };

        await newListing.save();

        req.flash("success", "Listing Created Successfully!");
        res.redirect(`/listings/${newListing._id}`); // redirects to view page
    } catch (err) {
        console.log(err);
        res.send("Error creating listing");
    }
};

// =========================
// EDIT LISTING FORM
// =========================
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
};

// =========================
// UPDATE LISTING
// =========================
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.category = req.body.listing.category;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
    }

    await listing.save();
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

// =========================
// DELETE LISTING
// =========================
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};

