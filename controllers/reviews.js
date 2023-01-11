const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.campId);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Avaliação adicionada!');
    res.redirect(`/campgrounds/${ campground._id }`);
}

module.exports.deleteReview = async (req, res) => {
    const { campId, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(campId, {$pull: {reviews: reviewId}});
    req.flash('success', 'Avaliação removida!');
    res.redirect(`/campgrounds/${ campId }`);
}