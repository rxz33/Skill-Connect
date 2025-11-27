const Listing = require("../models/listing");

// =========================
// A1 — IMPROVED SEARCH + FILTER LOGIC
// =========================
module.exports.index = async (req, res) => {
    const { category, search } = req.query;

    let filter = {};

    // Category filter
    if (category) {
        filter.category = category;
    }

    // Search filter (title + description + location)
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
        ];
    }

    const listings = await Listing.find(filter);

    res.render("listings/index.ejs", { listings, category, search });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);
        console.log("USER:", req.user);

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url: req.file.path, filename: req.file.filename };
        await newListing.save();

        res.redirect("/listings");
    } catch (err) {
        console.error("❌ CREATE ERROR:", err);
        return res.status(500).send(err.message);
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_256");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
};
