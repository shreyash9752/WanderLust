const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Fix import path
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // Use the correct database
const methodOverride = require("method-override"); 
const ejsMate =require("ejs-mate"); 
main()
   .then(()=>{
    console.log("Connected to MongoDB");
   })
   .catch(err => {console.log(err);
   });

async function main() {
    await mongoose.connect(MONGO_URL);
    
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req, res) => {
    res.send("HI, I am root");
});

//Index Route
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings }); // No need to include "/views"
    } catch (error) {
        res.status(500).send("Error fetching listings");
    }
});

//New Route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route for single entity
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route 
app.post("/listings", async(req,res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    
});

//Edit Route
app.get("/listings/:id/edit", async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

})
//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let updatedData = req.body; // Get updated data from the form
    await Listing.findByIdAndUpdate(id, updatedData, { new: true });
    res.redirect(`/listings/${id}`); // Redirect to updated listing page
});
//DELETE ROUTE

app.delete("/listings/:id",async(req, res) =>{
    let { id } = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    
});


// app.get("/testingListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
