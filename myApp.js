
/* Import the required packages and load environment variables. */
const mongoose = require("mongoose");
require("dotenv").config();

/* Connect to the MongoDB Atlas database using the URI in .env. */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

/* Define the Person schema and specify the required name field. */
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

/* Create a model named Person from the schema. */
const Person = mongoose.model("Person", personSchema);

/* Create and save one person to the database. */
const createAndSavePerson = async (done) => {
    try {
        const person = new Person({
            name: "John",
            age: 25,
            favoriteFoods: ["rice", "pizza"]
        });

        const data = await person.save();
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Create several people using Model.create(). */
const createManyPeople = async (arrayOfPeople, done) => {
    try {
        const data = await Person.create(arrayOfPeople);
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Find all people whose names match the supplied name. */
const findPeopleByName = async (personName, done) => {
    try {
        const data = await Person.find({ name: personName });
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Find one person whose favoriteFoods array contains the supplied food. */
const findOneByFood = async (food, done) => {
    try {
        const data = await Person.findOne({ favoriteFoods: food });
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Find one person using their unique MongoDB document ID. */
const findPersonById = async (personId, done) => {
    try {
        const data = await Person.findById(personId);
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Find a person, add hamburger to their favorite foods, and save the change. */
const findEditThenSave = async (personId, done) => {
    try {
        const person = await Person.findById(personId);

        if (!person) {
            return done(new Error("Person not found"));
        }

        person.favoriteFoods.push("hamburger");

        const data = await person.save();
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Find a person by name and update their age to 20.
   Return the updated document instead of the original. */
const findAndUpdate = async (personName, done) => {
    try {
        const data = await Person.findOneAndUpdate(
            { name: personName },
            { age: 20 },
            { new: true }
        );

        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Delete one person by their MongoDB document ID. */
const removeById = async (personId, done) => {
    try {
        const data = await Person.findByIdAndDelete(personId);
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Delete every person whose name is Mary.
   deleteMany() replaces the outdated Model.remove() method. */
const removeManyPeople = async (done) => {
    try {
        const data = await Person.deleteMany({ name: "Mary" });
        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Find people who like burritos, sort by name, limit to two,
   exclude their age, and execute the query. */
const queryChain = async (done) => {
    try {
        const data = await Person.find({ favoriteFoods: "burritos" })
            .sort({ name: 1 })
            .limit(2)
            .select("-age")
            .exec();

        done(null, data);
    } catch (err) {
        done(err);
    }
};

/* Export the model and functions so other files or tests can use them. */
module.exports = {
    Person,
    createAndSavePerson,
    createManyPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
};
