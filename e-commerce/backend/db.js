const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Tomato:Tomato12@cluster0.rv6zfzm.mongodb.net/TomatoMern?retryWrites=true&w=majority'

const mongoDB =() => {
    mongoose.connect(mongoURI)
    .then(() => {
        console.log("connection successful.....")
        const fetched_data = mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray()
        .then((data) => {
            global.food_items = data
            const foodCategory = mongoose.connection.db.collection("food_category");
            foodCategory.find({}).toArray()
            .then((catData)=> {
                global.foodCategory = catData
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err));
}
module.exports = mongoDB;