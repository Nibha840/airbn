const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    image: {
        filename:{
            type: String,
            default:"listingimage"
        },
        url:{
            type:String,
            default:
              "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/",
            set: (v) =>
              v === ""
                ? "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/"
                : v,
    }},

    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;