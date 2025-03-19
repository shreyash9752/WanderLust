const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required :true,
    },
    description: String,
    image:{
        type:String,
        default:
            " https://images.unsplash.com/photo-1740094714220-1b0c181be46d?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ddefault line " ,

        set:(v)=> 
        v === ""
         ? " https://images.unsplash.com/photo-1740094714220-1b0c181be46d?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ddefault line "
         : v,
    },
    price: Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;