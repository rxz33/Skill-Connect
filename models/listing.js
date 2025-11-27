const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
      url:String,
      filename:String,
  },
  category: {
  type: String,
  required: true,
  enum: [
    "Women's Salon & Spa",
    "Men's Salon & Spa",
    "AC & Appliances Repair",
    "Plumber",
    "Carpenter",
    "Cleaning & Pest Control",
    "Electrician",
    "Water Purifier",
    "Painting & Water Proofing"
  ]
}

,
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: { $in: listing.reviews}
    });
  }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;