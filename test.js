const {
    createManyPeople
} = require("./myApp");

// Create an array of people to insert into MongoDB.
const arrayOfPeople = [
    {
        name: "Mary",
        age: 28,
        favoriteFoods: ["burritos", "rice"]
    },
    {
        name: "John",
        age: 22,
        favoriteFoods: ["pizza", "hamburger"]
    },
    {
        name: "Sarah",
        age: 24,
        favoriteFoods: ["burritos", "pasta"]
    }
];

// Call the function and handle its result.
createManyPeople(arrayOfPeople, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});