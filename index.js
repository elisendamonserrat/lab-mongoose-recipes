const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    /* Iteration 2: Create a recipe
    const newRecipe = data[0];
    const addRecipe = Recipe.create(newRecipe).then(recipe => 
      console.log('The recipe is saved and its title is: ', recipe.title));
    return addRecipe
    */

    // Iteration 3: Insert multiple recipes
    let addAllRecipes = Recipe.insertMany(data)
     .then((recipes) => console.log(recipes));
    return addAllRecipes;
  })
  .then(() => {
    // Print recipes names in the console:
    Recipe.find({}, { title: 1, _id: 0}).then(title => {
      console.log(title)
    });

    // Iteration 4 - Update recipe:
    const updateRigatoniDuration = Recipe.updateOne({title: "Rigatoni alla Genovese"}, { duration: 100});
    return updateRigatoniDuration
  })
  .then((updatedRecipe) => {
    console.log('On iteration 4 we update 1 recipe', updatedRecipe);

    // Iteration 5 - Remove a recipe
    const removeCarrotCake = Recipe.deleteOne({title: "Carrot Cake"});
    return removeCarrotCake;
  })
  .then((removedRecipe) => {
    console.log(`Iteration 5 we removed one recipe:`, removedRecipe);

    // Iteration 6 - Close the Database
    const closeDB = mongoose.connection.close();
    return closeDB;
  })
  .then(() => {
    console.log("Database has been closed!")
  })
  .catch(error => {
    console.error('Error on the lab assigment', error);
  });
