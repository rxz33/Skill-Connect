const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utility/ExpressError");
const { listingSchema, reviewSchema } = require("./schema"); // <-- Updated schema will match categories

// ------------------------- LOGIN CHECK -------------------------
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
};

// --------------------- SAVE REDIRECT URL -----------------------
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// ----------------------- OWNER CHECK ---------------------------
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// ---------------- LISTING VALIDATION (FIXED) -------------------
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        let message = error.details.map(e => e.message).join(",");
        throw new ExpressError(400, message);
    }
    next();
};

// ---------------- REVIEW VALIDATION ----------------------------
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body, { convert: true });

    if (error) {
        let message = error.details.map(e => e.message).join(",");
        throw new ExpressError(400, message);
    }
    next();
};

// ----------------- REVIEW AUTHOR CHECK -------------------------
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You cannot delete someone else's review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
