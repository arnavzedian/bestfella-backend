const mongoose = require("mongoose");

let donation = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: String,
    image: String,
    email: String,
    city: String,
    latitude: Number,
    securityAmount: Number,
    type: String,
    price: Number,
    period: String,
    stock: String,
    longitude: Number,
    donater: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

donation.index({ tags: "text", title: "text" });
donation.index({ title: 1 });

//data.$** is not supported for search index
//there are two kinds of searches $text search and search inside aggregation
//$search be aggregation is really powerful as it is powered by mongoDB 4.2 full text search released in 2019
//It is the fourth tab in atlas
///read doc here: https://docs.atlas.mongodb.com/atlas-search/
//fields are string because mongoose can't allow putting dollar sign

module.exports = donation;
