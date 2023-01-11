const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{url: 'https://res.cloudinary.com/dc1qdui5d/image/upload/v1672949472/YelpCamp/fnrwacc95bk3nowbsce3.jpg', filename: 'nome'}],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat optio enim, veniam id laudantium quaerat harum doloremque neque magni velit, quos atque placeat, deserunt iste quam nihil consequatur officia necessitatibus.',
            price,
            author: '63a27bbf17c6619ebcd3f10e',
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})